export interface Document {
    ordersNumber: string;
    ordersDate: string;
    contractNumber: string;
    contractDate: string;
    goodItems: GoodItem[];
}

export interface GoodItem {
    name: string;
    quantity: string;
    price: string;
    priceWithVat: string;
    vatSummary: string;
}
