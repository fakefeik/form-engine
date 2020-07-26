import { ValidationContainer } from "@skbkontur/react-ui-validations";
import Button from "@skbkontur/react-ui/Button";
import React from "react";
import { batch, Provider } from "react-redux";
import { createStore } from "redux";

import { GOOD_ITEMS_COUNT } from "../Document";

import { EditorHeader } from "./EditorHeader";
import { EditorItems } from "./EditorItems";

const rootReducer = (state = {}, action: any) => {
    switch (action.type) {
        case "CHANGE":
            return { ...state, [action.path]: action.value };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export function change(path: string, value: any): any {
    return {
        type: "CHANGE",
        path: path,
        value: value,
    };
}

class ReduxEditorInternal extends React.Component {
    public componentDidMount(): void {
        batch(() => {
            store.dispatch(change("contractNumber", ""));
            store.dispatch(change("ordersNumber", ""));
            store.dispatch(change("contractDate", ""));
            store.dispatch(change("ordersDate", ""));
            for (let i = 0; i < GOOD_ITEMS_COUNT; i++) {
                store.dispatch(
                    change(`goodItems.${i}`, {
                        name: `item${i}`,
                        quantity: String(i),
                        price: "10",
                        priceWithVat: "11",
                        vatSummary: "1",
                    })
                );
            }
            store.dispatch(change("goodItems.length", GOOD_ITEMS_COUNT));
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <ValidationContainer>
                    <EditorHeader />
                    <EditorItems />
                    <Button onClick={this.handleSave}>Save</Button>
                </ValidationContainer>
            </div>
        );
    }

    private readonly handleSave = () => {
        console.info(store.getState());
    };
}

export function ReduxEditor(): JSX.Element {
    return (
        <Provider store={store}>
            <ReduxEditorInternal />
        </Provider>
    );
}
