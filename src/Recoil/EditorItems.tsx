import React from "react";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil/dist";

import { GoodItemsHeader, GoodItemRow, ItemRowProps } from "../Controls";
import { GoodItem } from "../Document";

import { documentAtoms } from "./RecoilEditor";

export function EditorItems(): JSX.Element {
    const goodItemsLength = useRecoilValue(documentAtoms["goodItems.length"]);
    return (
        <table>
            <GoodItemsHeader />
            <tbody>
                {Array.from(Array(goodItemsLength)).map((_, i) => (
                    <ItemRow key={i} index={i} />
                ))}
            </tbody>
        </table>
    );
}

function ItemRow({ index }: ItemRowProps) {
    const [goodItem, setGoodItem] = useRecoilState(documentAtoms[`goodItems.${index}`] as RecoilState<GoodItem>);
    return <GoodItemRow value={goodItem} onChange={setGoodItem} />;
}
