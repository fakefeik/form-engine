import Input from "@skbkontur/react-ui/Input";
import React from "react";
import { useRecoilState } from "recoil/dist";

import { documentAtoms } from "./RecoilEditor";

export function EditorHeader(): JSX.Element {
    const [ordersNumber, setOrdersNumber] = useRecoilState(documentAtoms["ordersNumber"]);
    const [contractNumber, setContractNumber] = useRecoilState(documentAtoms["contractNumber"]);

    return (
        <table>
            <tr>
                <td>Orders Number</td>
                <td>
                    <Input value={ordersNumber} onChange={(_, value) => setOrdersNumber(value)} />
                </td>
            </tr>
            <tr>
                <td>Contract Number</td>
                <td>
                    <Input value={contractNumber} onChange={(_, value) => setContractNumber(value)} />
                </td>
            </tr>
        </table>
    );
}
