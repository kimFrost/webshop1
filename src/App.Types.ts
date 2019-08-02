

export interface IApp {

}

export interface IProduct {
    ID: string;
    title: string;
    desc: string;
    price: {
        value: number;
        formatted: string;
    }
    media: {
        src: string;
    }
}

export interface IBasketItem {
    ID: string;
    title: string;
    quantity: number;
    price: {
        value: number;
        formatted: string;
    }
    media: {
        src: string;
    }
}

export interface ICta {
    ID: string;
    line1: string;
    line2: string;
    theme?: string;
    media: {
        src: string;
    }
}

export interface IBlock {
    type: string;
    payload: IProduct|ICta;
}

export interface IBasket {
    items: Array<IBasketItem>;
    itemsInBasket: number;
    total: {
        value: number;
        formatted: string;
    }
}