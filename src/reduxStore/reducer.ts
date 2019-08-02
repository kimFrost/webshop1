import { IBasket, IProduct, IBlock } from '../App.Types';
import { Reducer, Action } from 'redux';

interface IRequestState {
    ID: string,
    status: string,
    data: any
}

export interface IState {
    isFetchingBasket: boolean;
    isFetchingPageData: boolean;
    showMobileMenu: boolean;
    basket: IBasket;
    pageBlocks: Array<IBlock>;
    products: Array<IProduct>;
    requests: { [key: string]: IRequestState; };
}

interface IAction extends Action {
    payload?: any;
}

const defaultState: IState = {
    isFetchingBasket: false,
    isFetchingPageData: true,
    showMobileMenu: false,
    pageBlocks: [],
    basket: {
        items: [],
        itemsInBasket: 0,
        total: {
            value: 0,
            formatted: '0,00 DDK'
        }
    },
    products: [],
    requests: {}
};

export const reducer: Reducer<IState, IAction> = (state: IState = defaultState, action: IAction): IState => {
    switch (action.type) {
        case 'UPDATE_REQUEST_STATE': {
            const selector = `${action.payload.group}:${action.payload.ID}`;
            let request = state.requests[selector];
            if (request) {
                request.status = action.payload.status
                request.data = action.payload.data
            }
            else {
                state.requests[selector] = {
                    ID: action.payload.ID,
                    status: action.payload.status,
                    data: action.payload.data
                }
            }
            return {
                ...state
            };
        }
        case 'TOGGLE_MOBILEMENU': {
            return {
                ...state,
                showMobileMenu: (action.payload || !state.showMobileMenu)
            }
        }
        case 'FETCH_PAGE_DATA': {
            return {
                ...state,
                isFetchingPageData: true
            }
        }
        case 'FETCH_PAGE_DATA_SUCCESS': {
            return {
                ...state,
                pageBlocks: action.payload,
                isFetchingPageData: false
            }
        }
        case 'FETCH_PAGE_DATA_FAILURE': {
            return {
                ...state,
                isFetchingPageData: false
            }
        }
        case 'FETCH_PRODUCTS': {
            return {
                ...state
            }
        }
        case 'FETCH_PRODUCTS_SUCCESS': {
            return {
                ...state,
                products: action.payload
            }
        }
        case 'FETCH_PRODUCTS_FAILURE': {
            return {
                ...state
            }
        }
        case 'FETCH_PRODUCT': {
            return {
                ...state
            }
        }
        case 'ADD_PRODUCT_TO_BASKET': {
            return {
                ...state
            }
        }
        case 'ADD_PRODUCT_TO_BASKET_SUCCESS': {
            return {
                ...state,
                basket: action.payload
            }
        }
        case 'ADD_PRODUCT_TO_BASKET_FAILURE': {
            return {
                ...state
            }
        }
        case 'DECREASE_PRODUCT_QUANTITY': {
            return {
                ...state
            }
        }
        case 'DECREASE_PRODUCT_QUANTITY_SUCCESS': {
            return {
                ...state,
                basket: action.payload
            }
        }
        case 'DECREASE_PRODUCT_QUANTITY_FAILURE': {
            return {
                ...state
            }
        }
        case 'INCREASE_PRODUCT_QUANTITY': {
            return {
                ...state
            }
        }
        case 'INCREASE_PRODUCT_QUANTITY_SUCCESS': {
            return {
                ...state,
                basket: action.payload
            }
        }
        case 'INCREASE_PRODUCT_QUANTITY_FAILURE': {
            return {
                ...state
            }
        }
        case 'SET_PRODUCT_QUANTITY': {
            return {
                ...state
            }
        }
        case 'SET_PRODUCT_QUANTITY_SUCCESS': {
            return {
                ...state,
                basket: action.payload
            }
        }
        case 'SET_PRODUCT_QUANTITY_FAILURE': {
            return {
                ...state
            }
        }
        case 'REMOVE_PRODUCT_FROM_BASKET': {
            return {
                ...state
            }
        }
        case 'REMOVE_PRODUCT_FROM_BASKET_SUCCESS': {
            return {
                ...state,
                basket: action.payload
            }
        }
        case 'REMOVE_PRODUCT_FROM_BASKET_FAILURE': {
            return {
                ...state
            }
        }
        case 'FETCH_BASKET': {
            return {
                ...state,
                isFetchingBasket: true
            }
        }
        case 'FETCH_BASKET_SUCCESS': {
            return {
                ...state,
                basket: {
                    ...action.payload
                },
                isFetchingBasket: false
            }
        }
        case 'FETCH_BASKET_FAILURE': {
            return {
                ...state,
                isFetchingBasket: false
            }
        }
        default: {
            console.warn('Unexpected action', action.type);
            return state
        }
        //default: throw new Error('Unexpected action');
    }
}