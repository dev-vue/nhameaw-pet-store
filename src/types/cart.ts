export interface MyCartData {
    id: number;
    productName: string;
    productItemName: string;
    productItemQuantityName: string | null;
    productQuantityName: string | null;
    imageUrl: string;
    price: number;
    originalPrice: number | null;
    quantity: number;
}

export interface MyCartCountResponse {
    total: number;
}
