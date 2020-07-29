import { createStore, createEvent, combine, Store } from "effector";
import { GOOD_ITEMS_COUNT, GoodItem } from "../Document";
import Button from "@skbkontur/react-ui/Button";
import { ValidationContainer } from "@skbkontur/react-ui-validations";
import React from "react";
import { EditorHeader } from "./EditorHeader";
import { EditorItems } from "./EditorItems";

export const documentStores = {
    ordersNumber: createStore<string>("", { name: "ordersNumber" }),
    ordersDate: createStore<string>("", { name: "ordersDate" }),
    contractNumber: createStore<string>("", { name: "contractNumber" }),
    contractDate: createStore<string>("", { name: "contractDate" }),
    goodItems: createStore<GoodItem[]>([], { name: "goodItems" }),
};

export const documentDependencies = {
    ordersNumber: combine([documentStores.ordersDate]) as Store<string[]>,
    ordersDate: combine([documentStores.ordersNumber]) as Store<string[]>,
    contractNumber: combine([]) as Store<string[]>,
    contractDate: combine([]) as Store<string[]>,
};

export const documentUpdates = {
    ordersNumber: createEvent<string>("ordersNumberUpdated"),
    ordersDate: createEvent<string>("ordersDateUpdated"),
    contractNumber: createEvent<string>("contractNumberUpdated"),
    contractDate: createEvent<string>("contractDateUpdated"),
    goodItems: createEvent<{ index: number; goodItem: GoodItem }>("goodItemUpdated"),
};

documentStores.goodItems.on(documentUpdates.goodItems, (list, update) => [
    ...list.slice(0, update.index),
    update.goodItem,
    ...list.slice(update.index + 1),
]);
documentStores.ordersNumber.on(documentUpdates.ordersNumber, (_, x) => x);
documentStores.ordersDate.on(documentUpdates.ordersDate, (_, x) => x);
documentStores.contractNumber.on(documentUpdates.contractNumber, (_, x) => x);
documentStores.contractDate.on(documentUpdates.contractDate, (_, x) => x);

for (let i = 0; i < GOOD_ITEMS_COUNT; i++) {
    documentUpdates.goodItems({
        index: i,
        goodItem: {
            name: `item${i}`,
            quantity: String(i),
            price: "10",
            priceWithVat: "11",
            vatSummary: "1",
        },
    });
}

export function EffectorEditor() {
    const handleSave = () => {
        console.info({
            ordersNumber: documentStores.ordersNumber.getState(),
            ordersDate: documentStores.ordersDate.getState(),
            contractNumber: documentStores.contractNumber.getState(),
            contractDate: documentStores.contractDate.getState(),
            goodItems: documentStores.goodItems.getState(),
        });
    };
    return (
        <ValidationContainer>
            <EditorHeader />
            <EditorItems />
            <Button onClick={handleSave}>Save</Button>
        </ValidationContainer>
    );
}
