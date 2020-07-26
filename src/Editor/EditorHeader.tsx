import React from "react";

import { NumberInput, DateInput } from "../Controls";
import { Document } from "../Document";

interface EditorHeaderProps {
    document: Document;
    onChange: (ordersNumber: string, ordersDate: string, contractNumber: string, contractDate: string) => void;
}

export function EditorHeader({ document, onChange }: EditorHeaderProps): JSX.Element {
    return (
        <table>
            <tr>
                <td>Orders Number</td>
                <td>
                    <NumberInput
                        value={document.ordersNumber}
                        dependencies={[document.ordersDate]}
                        onChange={value =>
                            onChange(value, document.ordersDate, document.contractNumber, document.contractDate)
                        }
                    />
                </td>
                <td>Orders Date</td>
                <td>
                    <DateInput
                        value={document.ordersDate}
                        dependencies={[document.ordersNumber]}
                        onChange={value =>
                            onChange(document.ordersNumber, value, document.contractNumber, document.contractDate)
                        }
                    />
                </td>
            </tr>
            <tr>
                <td>Contract Number</td>
                <td>
                    <NumberInput
                        value={document.contractNumber}
                        dependencies={[]}
                        onChange={value =>
                            onChange(document.ordersNumber, document.ordersDate, value, document.contractDate)
                        }
                    />
                </td>
                <td>Contract Date</td>
                <td>
                    <DateInput
                        value={document.contractDate}
                        dependencies={[]}
                        onChange={value =>
                            onChange(document.ordersNumber, document.ordersDate, document.contractNumber, value)
                        }
                    />
                </td>
            </tr>
        </table>
    );
}
