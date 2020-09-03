
import { IBasket, IProduct, IBlock } from './App.Types';

const placeholderDescs = [
    'Earum in dolor magni sunt repellendus, cumque officia sequi.',
    'Icia sequi, ducimus tempora culpa distinctio mollitia consequatur.',
    'Tinctio mollitia consequatur, laboriosam placeat iusto eius repudiandae.'
];

const placeholderPrices = [
    99.95,
    49.95,
    149.95,
    199.95,
]

const mockBasket: IBasket = {
    items: [],
    itemsInBasket: 0,
    total: {
        value: 0,
        formatted: '0,00 DDK'
    }
}
const mockProducts: Array<IProduct> = []

for (let i = 0; i < 60; i++) {
    const price = placeholderPrices[Math.floor(Math.random() * placeholderPrices.length)];
    mockProducts.push({
        ID: `Product_0${i}`,
        title: `Product ${i}`,
        price: {
            value: price,
            formatted: price + ' DDK'
        },
        desc: placeholderDescs[Math.floor(Math.random() * placeholderDescs.length)],
        media: {
            //src: 'https://loremflickr.com/320/240/cat/?random=' + i
            src: '/Products/product-' + (i % 6 + 1) + '.png?random=' + i 
        }
    })
}

const mockFrontPageData: Array<IBlock> = mockProducts.map((product) => {
    return {
        type: 'product',
        payload: product
    }
})


mockFrontPageData.splice(0, 0, {
    type: 'cta',
    payload: {
        ID: 'Cta_01',
        line1: 'Title',
        line2: 'subtitle',
        media: {
            src: ''
        }
    }
})
mockFrontPageData.splice(9, 0, {
    type: 'cta',
    payload: {
        ID: 'Cta_02',
        line1: 'Title',
        line2: 'subtitle',
        media: {
            src: ''
        }
    }
})
mockFrontPageData.splice(14, 0, {
    type: 'cta',
    payload: {
        ID: 'Cta_03',
        line1: 'Title',
        line2: 'subtitle',
        media: {
            src: ''
        }
    }
})

const randomReponseTime = (min = 500, max = 2500): number => {
    max = (min > max) ? min : max;
    return Math.random() * (max - min) + min;
}

const writeBasketCookie = (basket: IBasket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}

const readBasketCookie = (): IBasket => {
    const basket = JSON.parse(localStorage.getItem('basket') || '{}');
    if (basket && basket.items) {
        return basket as IBasket;
    }
    else {
        return mockBasket;
    }
}

const fetchPageData = async (): Promise<Array<IBlock>> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockFrontPageData)
        }, randomReponseTime())
    });
}

const fetchProducts = async (): Promise<Array<IProduct>> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockProducts)
        }, randomReponseTime(1500))
    });
}

const fetchProduct = async (ID: string): Promise<IProduct | undefined> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockProducts.filter(product => product.ID === ID)[0]);
        }, randomReponseTime(1500))
    });
}

const fetchBasket = async (): Promise<IBasket> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(readBasketCookie())
        }, randomReponseTime())
    });
}

const increaseItemQuantity = async (productID: string) => {
    return addProductToBasket(productID);
}

const decreaseItemQuantity = async (productID: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const basket = readBasketCookie();
            basket.items.map(item => {
                if (item.ID === productID) {
                    item.quantity--;
                }
            });
            basket.items = basket.items.filter(item => {
                return item.quantity > 0
            });
            basket.itemsInBasket = basket.items.reduce((total, item) => {
                return total += item.quantity;
            }, 0);
            basket.total.value = basket.items.reduce((total, item) => {
                return total += item.price.value * item.quantity
            }, 0);
            basket.total.formatted = basket.total.value.toFixed(2) + ' DDK';
            writeBasketCookie(basket);
            resolve(basket)
        }, randomReponseTime())
    });
}

const changeItemQuantity = async (productID: string, quantity: number) => {
    if (quantity === 0) {
        return removeProductFromBasket(productID);
    }
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const basket = readBasketCookie();
                basket.items.map(item => {
                    if (item.ID === productID) {
                        item.quantity = quantity;
                    }
                });
                basket.itemsInBasket = basket.items.reduce((total, item) => {
                    return total += item.quantity;
                }, 0);
                basket.total.value = basket.items.reduce((total, item) => {
                    return total += item.price.value * item.quantity
                }, 0);
                basket.total.formatted = basket.total.value.toFixed(2) + ' DDK';
                writeBasketCookie(basket);
                resolve(basket)
            }, randomReponseTime())
        });
    }
}

const addProductToBasket = async (productID: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const basket = readBasketCookie();

            let found = false;
            basket.items.map(item => {
                if (item.ID === productID) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                const product = mockProducts.filter(product => product.ID === productID)[0]
                if (product) {
                    basket.items.push({
                        ID: productID,
                        title: productID,
                        quantity: 1,
                        price: product.price,
                        media: product.media
                    })
                }
            }
            basket.itemsInBasket = basket.items.reduce((total, item) => {
                return total += item.quantity;
            }, 0);
            basket.total.value = basket.items.reduce((total, item) => {
                return total += item.price.value * item.quantity
            }, 0);
            basket.total.formatted = basket.total.value.toFixed(2) + ' DDK';
            writeBasketCookie(basket);
            resolve(basket)
        }, randomReponseTime())
    });
}

const removeProductFromBasket = async (productID: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const basket = readBasketCookie();
            basket.items = basket.items.filter(item => {
                return item.ID !== productID
            });
            basket.itemsInBasket = basket.items.reduce((total, item) => {
                return total += item.quantity;
            }, 0);
            basket.total.value = basket.items.reduce((total, item) => {
                return total += item.price.value * item.quantity
            }, 0);
            basket.total.formatted = basket.total.value.toFixed(2) + ' DDK';
            writeBasketCookie(basket);
            resolve(basket)
        }, randomReponseTime())
    });
}

export {
    fetchPageData,
    fetchProducts,
    fetchProduct,
    fetchBasket,
    increaseItemQuantity,
    decreaseItemQuantity,
    changeItemQuantity,
    addProductToBasket,
    removeProductFromBasket
}