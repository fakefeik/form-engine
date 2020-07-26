import React from "react";
import { connect } from "react-redux";

import { InputProps, DateInput, NumberInput } from "../Controls";

import { change } from "./ReduxEditor";

export function EditorHeader(): JSX.Element {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Orders Number</td>
                    <td>
                        <NumberInputRedux path={"ordersNumber"} deps={["ordersDate"]} />
                    </td>
                    <td>Orders Date</td>
                    <td>
                        <DateInputRedux path={"ordersDate"} deps={["ordersNumber"]} />
                    </td>
                </tr>
                <tr>
                    <td>Contract Number</td>
                    <td>
                        <NumberInputRedux path={"contractNumber"} deps={[]} />
                    </td>
                    <td>Contract Date</td>
                    <td>
                        <DateInputRedux path={"contractDate"} deps={[]} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

const mapStateToProps = (state: any, ownProps: InputProps) => ({
    value: state[ownProps.path],
    dependencies: ownProps.deps.map(x => state[x]),
});

const mapDispatchToProps = (dispatch: any, ownProps: InputProps) => ({
    onChange: (value: string) => dispatch(change(ownProps.path, value)),
});

const NumberInputRedux = connect(mapStateToProps, mapDispatchToProps)(NumberInput);
const DateInputRedux = connect(mapStateToProps, mapDispatchToProps)(DateInput);
