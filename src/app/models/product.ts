export class Product {
    SKU: string;
    productId: string;
    productName: string;
    productCategory: [string];
    productSummary?: string;
    productPrice: number;
    productDescription: string;
    productImageUrls: [UrlItem];
    productAddedAt: Date;
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
        this.productAddedAt = new Date();
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
