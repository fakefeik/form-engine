import React from "react";
import { connect } from "react-redux";

import { GoodItemRow, GoodItemsHeader, ItemRowProps } from "../Controls";
import { GoodItem } from "../Document";

import { change } from "./ReduxEditor";

interface EditorItemsProps {
    goodItemsLength: number;
}

export function EditorItemsInternal({ goodItemsLength }: EditorItemsProps): JSX.Element {
    return (
        <table>
            <GoodItemsHeader />
            <tbody>
                {Array.from(Array(goodItemsLength)).map((_, i) => (
                    <ItemRow key={i} index={i} />
                ))}
            </tbody>
        </table>
    );
}

const mapStateToProps = (state: any) => ({ goodItemsLength: state["goodItems.length"] });
export const EditorItems = connect(mapStateToProps)(EditorItemsInternal);

const mapStateToPropsItem = (state: any, ownProps: ItemRowProps) => ({ value: state[`goodItems.${ownProps.index}`] });
const mapDispatchToProps = (dispatch: any, ownProps: ItemRowProps) => ({
    onChange: (value: GoodItem) => dispatch(change(`goodItems.${ownProps.index}`, value)),
});

const ItemRow = connect(mapStateToPropsItem, mapDispatchToProps)(GoodItemRow);
