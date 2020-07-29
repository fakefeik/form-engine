import React from "react";

import { GoodItemsHeader, GoodItemRow } from "../Controls";
import { useList } from "effector-react";
import { documentStores, documentUpdates } from "./EffectorEditor";

export function EditorItems(): JSX.Element {
    const list = useList(documentStores.goodItems, (goodItem, index) => {
        return (
            <GoodItemRow value={goodItem} onChange={x => documentUpdates.goodItems({ index: index, goodItem: x })} />
        );
    });
    return (
        <table>
            <GoodItemsHeader />
            <tbody>{list}</tbody>
        </table>
    );
}
