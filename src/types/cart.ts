export interface MyCartData {
    id: number;
    productName: string;
    productItemName: string;
    productItemQuantityName: string | null;
    productQuantityName: string | null;
    imageUrl: string;
    imageMainUrl: string;
    price: number;
    originalPrice: number | null;
    quantity: number;
}

export interface MyCartCountResponse {
    total: number;
}


export interface AddItemToCart {
    lineUserId: string,
    productItemId: string,
    productItemQuantityId: string,
    productQuantityId: string,
    quantity: number,
}

export interface DeleteCartItem {
    id: number;
}