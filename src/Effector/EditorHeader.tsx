import React from "react";
import { NumberInput, DateInput, InputProps } from "../Controls";

import { documentDependencies, documentStores, documentUpdates } from "./EffectorEditor";
import { useStore } from "effector-react";

export function EditorHeader(): JSX.Element {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Orders Number</td>
                    <td>
                        <NumberInputEffector path={"ordersNumber"} deps={["ordersDate"]} />
                    </td>
                    <td>Orders Date</td>
                    <td>
                        <DateInputEffector path={"ordersDate"} deps={["ordersNumber"]} />
                    </td>
                </tr>
                <tr>
                    <td>Contract Number</td>
                    <td>
                        <NumberInputEffector path={"contractNumber"} deps={[]} />
                    </td>
                    <td>Contract Date</td>
                    <td>
                        <DateInputEffector path={"contractDate"} deps={[]} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function NumberInputEffector({ path }: InputProps) {
    const number = useStore(documentStores[path]) as any;
    const dependencies = useStore(documentDependencies[path]) as any;
    return <NumberInput value={number} dependencies={dependencies} onChange={documentUpdates[path]} />;
}

function DateInputEffector({ path }: InputProps) {
    const date = useStore(documentStores[path]) as any;
    const dependencies = useStore(documentDependencies[path]) as any;
    return <DateInput value={date} dependencies={dependencies} onChange={documentUpdates[path]} />;
}
