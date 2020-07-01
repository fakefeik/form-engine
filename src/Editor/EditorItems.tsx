import Input from "@skbkontur/react-ui/Input";
import React from "react";

import { GoodItem } from "../Document";

interface EditorItemsProps {
    goodItems: GoodItem[];
    onChange: (goodItems: GoodItem[]) => void;
}

export function EditorItems({ goodItems, onChange }: EditorItemsProps): JSX.Element {
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
                {goodItems.map((x, i) => (
                    <ItemRow
                        key={i}
                        goodItem={x}
                        index={i}
                        onChange={x => onChange([...goodItems.slice(0, i), x, ...goodItems.slice(i + 1)])}
                    />
                ))}
            </tbody>
        </table>
    );
}

interface ItemRowProps {
    goodItem: GoodItem;
    index: number;
    onChange: (goodItem: GoodItem) => void;
}

function ItemRow({ goodItem, index, onChange }: ItemRowProps) {
    return (
        <tr>
            <td>{index}</td>
            <td>
                <Input value={goodItem.name} onChange={(_, value) => onChange({ ...goodItem, name: value })} />
            </td>
            <td>
                <Input value={goodItem.quantity} onChange={(_, value) => onChange({ ...goodItem, quantity: value })} />
            </td>
            <td>
                <Input value={goodItem.price} onChange={(_, value) => onChange({ ...goodItem, price: value })} />
            </td>
            <td>
                <Input
                    value={goodItem.vatSummary}
                    onChange={(_, value) => onChange({ ...goodItem, vatSummary: value })}
                />
            </td>
            <td>
                <Input
                    value={goodItem.priceWithVat}
                    onChange={(_, value) => onChange({ ...goodItem, priceWithVat: value })}
                />
            </td>
        </tr>
    );
}
