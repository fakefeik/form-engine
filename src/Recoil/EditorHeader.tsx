import { ValidationWrapper, ValidationInfo } from "@skbkontur/react-ui-validations";
import DatePicker from "@skbkontur/react-ui/DatePicker";
import Input from "@skbkontur/react-ui/Input";
import React from "react";
import { useRecoilState, useRecoilValue, waitForAll } from "recoil/dist";

import { documentAtoms } from "./RecoilEditor";

export function EditorHeader(): JSX.Element {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Orders Number</td>
                    <td>
                        <NumberInput path={"ordersNumber"} deps={["ordersDate"]} />
                    </td>
                    <td>Orders Date</td>
                    <td>
                        <DateInput path={"ordersDate"} deps={["ordersNumber"]} />
                    </td>
                </tr>
                <tr>
                    <td>Contract Number</td>
                    <td>
                        <NumberInput path={"contractNumber"} deps={[]} />
                    </td>
                    <td>Contract Date</td>
                    <td>
                        <DateInput path={"contractDate"} deps={[]} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

interface InputProps {
    path: string;
    deps: string[];
}

function isNullOrWhitespace(x: Nullable<string>): boolean {
    return x == null ? true : x.trim() === "";
}

function NumberInput({ path, deps }: InputProps) {
    const [number, setNumber] = useRecoilState(documentAtoms[path]);
    const dependencies = useRecoilValue(waitForAll(deps.map(x => documentAtoms[x]))) as any[];
    console.info(dependencies);
    const validation: Nullable<ValidationInfo> =
        !isNullOrWhitespace(number) || dependencies.length === 0 || dependencies.some(x => isNullOrWhitespace(x))
            ? null
            : {
                  message: "Поле должно быть заполнено",
                  level: "error",
                  type: "immediate",
              };
    return (
        <ValidationWrapper validationInfo={validation}>
            <Input value={number} onChange={(_, value) => setNumber(value)} />
        </ValidationWrapper>
    );
}

function DateInput({ path, deps }: InputProps) {
    const [date, setDate] = useRecoilState(documentAtoms[path]);
    const dependencies = useRecoilValue(waitForAll(deps.map(x => documentAtoms[x])));
    console.info(dependencies);
    return <DatePicker value={date} onChange={(_, value) => setDate(value)} />;
}
