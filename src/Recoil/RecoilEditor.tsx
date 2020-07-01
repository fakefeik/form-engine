import Button from "@skbkontur/react-ui/Button";
import React from "react";
import { atom, useRecoilCallback } from "recoil/dist";

import { GoodItem } from "../Document";
import { EditorItems } from "../Editor/EditorItems";

import { EditorHeader } from "./EditorHeader";

export const ordersNumberAtom = atom({
    key: "ordersNumber",
    default: "",
});

export const contractNumberAtom = atom({
    key: "contractNumber",
    default: "",
});

export function RecoilEditor(): JSX.Element {
    const [goodItems, setGoodItems] = React.useState([] as GoodItem[]);

    const handleSave = useRecoilCallback(({ snapshot }) => async () => {
        const ordersNumber = await snapshot.getPromise(ordersNumberAtom);
        const contractNumber = await snapshot.getPromise(contractNumberAtom);
        console.info({
            ordersNumber: ordersNumber,
            contractNumber: contractNumber,
            goodItems: goodItems,
        });
    });

    React.useEffect(() => {
        if (goodItems.length === 0) {
            const newGoodItems = [];
            for (let i = 0; i < 200; i++) {
                newGoodItems.push({
                    name: `item${i}`,
                    quantity: String(i),
                    price: "10",
                    priceWithVat: "11",
                    vatSummary: "1",
                });
            }
            setGoodItems(newGoodItems);
        }
    });

    return (
        <div>
            <EditorHeader />
            <EditorItems goodItems={goodItems} onChange={setGoodItems} />
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
}
