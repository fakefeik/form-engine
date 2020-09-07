import { ValidationInfo, ValidationWrapper } from "@skbkontur/react-ui-validations";
import DatePicker from "@skbkontur/react-ui/DatePicker";
import Input from "@skbkontur/react-ui/Input";
import React from "react";

import { GoodItem } from "./Document";

export interface InputProps {
    path: string;
    deps: string[];
}

interface InputInternalProps {
    value: string;
    dependencies: string[];
    onChange: (value: string) => void;
}

function isNullOrWhitespace(x: Nullable<string>): boolean {
    return x == null ? true : x.trim() === "";
}

export function NumberInput({ value, onChange, dependencies }: InputInternalProps): JSX.Element {
    console.info(dependencies);
    const validation: Nullable<ValidationInfo> =
        !isNullOrWhitespace(value) || dependencies.length === 0 || dependencies.some(x => isNullOrWhitespace(x))
            ? null
            : {
                  message: "Поле должно быть заполнено",
                  level: "error",
                  type: "immediate",
              };
    return (
        <ValidationWrapper validationInfo={validation}>
            <Input value={value} onChange={(_, value) => onChange(value)} />
        </ValidationWrapper>
    );
}

export function DateInput({ value, onChange, dependencies }: InputInternalProps): JSX.Element {
    console.info(dependencies);
    return <DatePicker value={value} onChange={(_, value) => onChange(value)} />;
}

export function GoodItemsHeader(): JSX.Element {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Price with VAT</th>
                <th>VAT Summary</th>
                <th />
            </tr>
        </thead>
    );
}

export interface ItemRowProps {
    index: number;
}

interface ItemRowInternalProps {
    value: GoodItem;
    onChange: (value: GoodItem) => void;
}

export function GoodItemRow({ value, onChange }: ItemRowInternalProps): null | JSX.Element {
    if (value == null) {
        return null;
    }
    return (
        <tr>
            <td>
                <Input value={value.name} onChange={(_, x) => onChange({ ...value, name: x })} />
            </td>
            <td>
                <Input value={value.quantity} onChange={(_, x) => onChange({ ...value, quantity: x })} />
            </td>
            <td>
                <Input value={value.price} onChange={(_, x) => onChange({ ...value, price: x })} />
            </td>
            <td>
                <Input value={value.vatSummary} onChange={(_, x) => onChange({ ...value, vatSummary: x })} />
            </td>
            <td>
                <Input value={value.priceWithVat} onChange={(_, x) => onChange({ ...value, priceWithVat: x })} />
            </td>
        </tr>
    );
}
