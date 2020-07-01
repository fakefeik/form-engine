import Input from "@skbkontur/react-ui/Input";
import React from "react";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil/dist";

import { GoodItem } from "../Document";
import { documentAtoms } from "../Recoil/RecoilEditor";

export function EditorItems(): JSX.Element {
    const goodItemsLength = useRecoilValue(documentAtoms["goodItems.length"]);
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Price with VAT</th>
                    <th>VAT Summary</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {Array.from(Array(goodItemsLength)).map((_, i) => (
                    <ItemRow key={i} index={i} />
                ))}
            </tbody>
        </table>
    );
}

interface ItemRowProps {
    index: number;
}

function ItemRow({ index }: ItemRowProps) {
    const [goodItem, setGoodItem] = useRecoilState(documentAtoms[`goodItems.${index}`] as RecoilState<GoodItem>);
    return (
        <tr>
            <td>{index}</td>
            <td>
                <Input value={goodItem.name} onChange={(_, value) => setGoodItem({ ...goodItem, name: value })} />
            </td>
            <td>
                <Input
                    value={goodItem.quantity}
                    onChange={(_, value) => setGoodItem({ ...goodItem, quantity: value })}
                />
            </td>
            <td>
                <Input value={goodItem.price} onChange={(_, value) => setGoodItem({ ...goodItem, price: value })} />
            </td>
            <td>
                <Input
                    value={goodItem.vatSummary}
                    onChange={(_, value) => setGoodItem({ ...goodItem, vatSummary: value })}
                />
            </td>
            <td>
                <Input
                    value={goodItem.priceWithVat}
                    onChange={(_, value) => setGoodItem({ ...goodItem, priceWithVat: value })}
                />
            </td>
        </tr>
    );
}
