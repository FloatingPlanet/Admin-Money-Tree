import * as firebase from 'firebase';

export class Product {
    SKU: string;
    productId: string;
    productName: string;
    productCategory: [string];
    productSummary?: string;
    productPrice: number;
    productDescription: string;
    productImageUrls: [UrlItem];
    productAddedAt: any;

    productQuantity: number;
    ratings: number;
    favourite: boolean;
    productSeller?: string;

    constructor() {
        this.SKU = '';
        this.productId = '';
        this.productName = '';
        this.productCategory = [''];
        this.productPrice = 0;
        this.productDescription = '';
        this.productImageUrls = [new UrlItem()];
        this.productAddedAt = firebase.firestore.Timestamp.now();
        this.productQuantity = 0;
        this.ratings = 0;
        this.favourite = false;
    }
}

export class UrlItem {
    url: string;
    constructor() {
        this.url = '';
    }
}
