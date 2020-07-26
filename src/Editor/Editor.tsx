import Button from "@skbkontur/react-ui/Button";
import React from "react";

import { Document, GoodItem } from "../Document";

import { EditorHeader } from "./EditorHeader";
import { EditorItems } from "./EditorItems";

interface EditorState {
    document: Document;
}

export class Editor extends React.Component<{}, EditorState> {
    public state: EditorState = {
        document: {
            contractNumber: "",
            ordersNumber: "",
            contractDate: "",
            ordersDate: "",
            goodItems: [],
        },
    };

    public componentDidMount(): void {
        const goodItems = [];
        for (let i = 0; i < 1000; i++) {
            goodItems.push({
                name: `item${i}`,
                quantity: String(i),
                price: "10",
                priceWithVat: "11",
                vatSummary: "1",
            });
        }

        this.setState({
            document: {
                ordersNumber: "1",
                contractNumber: "123",
                contractDate: "",
                ordersDate: "",
                goodItems: goodItems,
            },
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <EditorHeader document={this.state.document} onChange={this.handleChangeDocument} />
                <EditorItems goodItems={this.state.document.goodItems} onChange={this.handleChangeItems} />
                <Button onClick={this.handleSave}>Save</Button>
            </div>
        );
    }

    private readonly handleChangeDocument = (
        ordersNumber: string,
        ordersDate: string,
        contractNumber: string,
        contractDate: string
    ) => {
        this.setState(state => ({
            document: {
                ...state.document,
                ordersNumber: ordersNumber,
                ordersDate: ordersDate,
                contractNumber: contractNumber,
                contractDate: contractDate,
            },
        }));
    };

    private readonly handleChangeItems = (goodItems: GoodItem[]) => {
        this.setState(state => ({
            document: {
                ...state.document,
                goodItems: goodItems,
            },
        }));
    };

    private readonly handleSave = () => {
        console.info(this.state.document);
    };
}
