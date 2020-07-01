export interface Document {
    ordersNumber: string;
    contractNumber: string;
    goodItems: GoodItem[];
}

export interface GoodItem {
    name: string;
    quantity: string;
    price: string;
    priceWithVat: string;
    vatSummary: string;
}
