import Input from "@skbkontur/react-ui/Input";
import React from "react";

import { Document } from "../Document";

interface EditorHeaderProps {
    document: Document;
    onChange: (ordersNumber: string, contractNumber: string) => void;
}

export function EditorHeader({ document, onChange }: EditorHeaderProps): JSX.Element {
    return (
        <table>
            <tr>
                <td>Orders Number</td>
                <td>
                    <Input
                        value={document.ordersNumber}
                        onChange={(_, value) => onChange(value, document.contractNumber)}
                    />
                </td>
            </tr>
            <tr>
                <td>Contract Number</td>
                <td>
                    <Input
                        value={document.contractNumber}
                        onChange={(_, value) => onChange(document.ordersNumber, value)}
                    />
                </td>
            </tr>
        </table>
    );
}
