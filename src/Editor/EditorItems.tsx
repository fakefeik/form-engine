import React from "react";

import { GoodItemRow, GoodItemsHeader } from "../Controls";
import { GoodItem } from "../Document";

interface EditorItemsProps {
    goodItems: GoodItem[];
    onChange: (goodItems: GoodItem[]) => void;
}

export function EditorItems({ goodItems, onChange }: EditorItemsProps): JSX.Element {
    return (
        <table>
            <GoodItemsHeader />
            <tbody>
                {goodItems.map((x, i) => (
                    <GoodItemRow
                        key={i}
                        value={x}
                        onChange={x => onChange([...goodItems.slice(0, i), x, ...goodItems.slice(i + 1)])}
                    />
                ))}
            </tbody>
        </table>
    );
}
