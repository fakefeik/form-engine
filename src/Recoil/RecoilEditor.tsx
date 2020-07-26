import { ValidationContainer } from "@skbkontur/react-ui-validations";
import Button from "@skbkontur/react-ui/Button";
import React from "react";
import { atom, useRecoilCallback, RecoilState, useRecoilState, RecoilRoot } from "recoil/dist";

import { EditorHeader } from "./EditorHeader";
import { EditorItems } from "./EditorItems";

type Atoms = { [key: string]: RecoilState<any> };

export const documentAtoms: Atoms = {
    ordersNumber: atom({
        key: "ordersNumber",
        default: "",
    }),
    ordersDate: atom({
        key: "ordersDate",
        default: "",
    }),
    contractNumber: atom({
        key: "contractNumber",
        default: "",
    }),
    contractDate: atom({
        key: "contractDate",
        default: "",
    }),
    "goodItems.length": atom({
        key: "goodItems.length",
        default: 0,
    }),
};

function RecoilEditorInternal() {
    const [goodItemsLength, setGoodItemsLength] = useRecoilState(documentAtoms["goodItems.length"]);

    const handleSave = useRecoilCallback(({ snapshot }) => async () => {
        const ordersNumber = await snapshot.getPromise(documentAtoms["ordersNumber"]);
        const ordersDate = await snapshot.getPromise(documentAtoms["ordersDate"]);
        const contractNumber = await snapshot.getPromise(documentAtoms["contractNumber"]);
        const contractDate = await snapshot.getPromise(documentAtoms["contractDate"]);
        const goodItemsLength = await snapshot.getPromise(documentAtoms["goodItems.length"]);
        const newGoodItems = [];
        for (let i = 0; i < goodItemsLength; i++) {
            newGoodItems.push(await snapshot.getPromise(documentAtoms[`goodItems.${i}`]));
        }
        console.info({
            ordersNumber: ordersNumber,
            ordersDate: ordersDate,
            contractNumber: contractNumber,
            contractDate: contractDate,
            goodItems: newGoodItems,
        });
    });

    React.useEffect(() => {
        if (goodItemsLength === 0) {
            const length = 1000;
            for (let i = 0; i < length; i++) {
                const key = `goodItems.${i}`;
                if (documentAtoms[key]) {
                    continue;
                }
                documentAtoms[`goodItems.${i}`] = atom({
                    key: `goodItems.${i}`,
                    default: {
                        name: `item${i}`,
                        quantity: String(i),
                        price: "10",
                        priceWithVat: "11",
                        vatSummary: "1",
                    },
                });
            }
            console.info(goodItemsLength);
            setGoodItemsLength(length);
        }
    });

    return (
        <div>
            <ValidationContainer>
                <EditorHeader />
                <EditorItems />
                <Button onClick={handleSave}>Save</Button>
            </ValidationContainer>
        </div>
    );
}

export function RecoilEditor(): JSX.Element {
    return (
        <RecoilRoot>
            <RecoilEditorInternal />
        </RecoilRoot>
    );
}
