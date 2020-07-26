import React from "react";
import { useRecoilState, useRecoilValue, waitForAll } from "recoil/dist";

import { NumberInput, DateInput, InputProps } from "../Controls";

import { documentAtoms } from "./RecoilEditor";

export function EditorHeader(): JSX.Element {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Orders Number</td>
                    <td>
                        <NumberInputRecoil path={"ordersNumber"} deps={["ordersDate"]} />
                    </td>
                    <td>Orders Date</td>
                    <td>
                        <DateInputRecoil path={"ordersDate"} deps={["ordersNumber"]} />
                    </td>
                </tr>
                <tr>
                    <td>Contract Number</td>
                    <td>
                        <NumberInputRecoil path={"contractNumber"} deps={[]} />
                    </td>
                    <td>Contract Date</td>
                    <td>
                        <DateInputRecoil path={"contractDate"} deps={[]} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function NumberInputRecoil({ path, deps }: InputProps) {
    const [number, setNumber] = useRecoilState(documentAtoms[path]);
    const dependencies = useRecoilValue(waitForAll(deps.map(x => documentAtoms[x]))) as any[];
    return <NumberInput value={number} dependencies={dependencies} onChange={setNumber} />;
}

function DateInputRecoil({ path, deps }: InputProps) {
    const [date, setDate] = useRecoilState(documentAtoms[path]);
    const dependencies = useRecoilValue(waitForAll(deps.map(x => documentAtoms[x]))) as any[];
    return <DateInput value={date} dependencies={dependencies} onChange={setDate} />;
}
