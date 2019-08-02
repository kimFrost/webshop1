import { Dispatch, Action, Middleware, MiddlewareAPI } from 'redux'
import { fetchPageData, fetchProducts, fetchProduct, fetchBasket, addProductToBasket, removeProductFromBasket, changeItemQuantity, decreaseItemQuantity, increaseItemQuantity } from '../mock'

const dispatchRequestUpdate = (dispatch: any, ID: string, group: string, status: string, data: any = undefined) => {
    dispatch({
        type: 'UPDATE_REQUEST_STATE',
        payload: {
            ID: ID,
            group: group,
            status: status,
            data: data
        }
    });
}

export const loadProducts = () => {
    return (dispatch: Dispatch, getState: any) => {
        fetchProducts().then((response) => {
            dispatch({
                type: 'FETCH_PRODUCTS_SUCCESS',
                payload: response
            });
        }).catch(() => {
            dispatch({
                type: 'FETCH_PRODUCTS_FAILURE'
            })
        })
    }
}

export const logger: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export const middleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
    next(action);
    switch (action.type) {
        case 'FETCH_PAGE_DATA': {
            fetchPageData().then((response) => {
                next({
                    type: 'FETCH_PAGE_DATA_SUCCESS',
                    payload: response
                });
            }).catch(() => {
                next({
                    type: 'FETCH_PAGE_DATA_FAILURE'
                })
            })
            break;
        }
        case 'FETCH_PRODUCTS': {
            fetchProducts().then((response) => {
                next({
                    type: 'FETCH_PRODUCTS_SUCCESS',
                    payload: response
                });
            }).catch(() => {
                next({
                    type: 'FETCH_PRODUCTS_FAILURE'
                })
            })
            break;
        }
        case 'FETCH_BASKET': {
            fetchBasket().then((response) => {
                next({
                    type: 'FETCH_BASKET_SUCCESS',
                    payload: response
                });
            }).catch(() => {
                next({
                    type: 'FETCH_BASKET_FAILURE'
                })
            })
            break;
        }
        case 'FETCH_PRODUCT': {
            dispatchRequestUpdate(dispatch, action.payload, 'FETCH_PRODUCT', 'pending');
            fetchProduct(action.payload).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'FETCH_PRODUCT', 'success', response);
            }).catch(() => {
                dispatchRequestUpdate(dispatch, action.payload, 'FETCH_PRODUCT', 'error');
            })
            break;
        }
        case 'ADD_PRODUCT_TO_BASKET': {
            dispatchRequestUpdate(dispatch, action.payload, 'ADD_PRODUCT_TO_BASKET', 'pending');
            addProductToBasket(action.payload).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'ADD_PRODUCT_TO_BASKET', 'success');
                next({
                    type: 'ADD_PRODUCT_TO_BASKET_SUCCESS',
                    payload: response
                })
            }).catch((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'ADD_PRODUCT_TO_BASKET', 'error');
                next({
                    type: 'ADD_PRODUCT_TO_BASKET_FAILURE',
                    payload: response
                })
            })
            break;
        }
        case 'DECREASE_PRODUCT_QUANTITY': {
            dispatchRequestUpdate(dispatch, action.payload, 'DECREASE_PRODUCT_QUANTITY', 'pending');
            decreaseItemQuantity(action.payload).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'DECREASE_PRODUCT_QUANTITY', 'success');
                next({
                    type: 'DECREASE_PRODUCT_QUANTITY_SUCCESS',
                    payload: response
                })
            }).catch((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'DECREASE_PRODUCT_QUANTITY', 'error');
                next({
                    type: 'DECREASE_PRODUCT_QUANTITY_FAILURE',
                    payload: response
                })
            })
            break;
        }
        case 'INCREASE_PRODUCT_QUANTITY': {
            dispatchRequestUpdate(dispatch, action.payload, 'INCREASE_PRODUCT_QUANTITY', 'pending');
            increaseItemQuantity(action.payload).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'INCREASE_PRODUCT_QUANTITY', 'success');
                next({
                    type: 'INCREASE_PRODUCT_QUANTITY_SUCCESS',
                    payload: response
                })
            }).catch((response) => {
                dispatchRequestUpdate(dispatch, action.payload, 'INCREASE_PRODUCT_QUANTITY', 'error');
                next({
                    type: 'INCREASE_PRODUCT_QUANTITY_FAILURE',
                    payload: response
                })
            })
            break;
        }
        case 'SET_PRODUCT_QUANTITY': {
            dispatchRequestUpdate(dispatch, action.payload.ID, 'SET_PRODUCT_QUANTITY', 'pending');
            changeItemQuantity(action.payload.ID, action.payload.quantity).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload.ID, 'SET_PRODUCT_QUANTITY', 'success');
                next({
                    type: 'SET_PRODUCT_QUANTITY_SUCCESS',
                    payload: response
                })
            }).catch((response) => {
                dispatchRequestUpdate(dispatch, action.payload.ID, 'SET_PRODUCT_QUANTITY', 'error');
                next({
                    type: 'SET_PRODUCT_QUANTITY_FAILURE',
                    payload: response
                })
            })
            break;
        }
        case 'REMOVE_PRODUCT_FROM_BASKET': {
            dispatchRequestUpdate(dispatch, action.payload.ID, 'REMOVE_PRODUCT_FROM_BASKET', 'pending');
            removeProductFromBasket(action.payload.ID).then((response) => {
                dispatchRequestUpdate(dispatch, action.payload.ID, 'REMOVE_PRODUCT_FROM_BASKET', 'success');
                next({
                    type: 'REMOVE_PRODUCT_FROM_BASKET_SUCCESS',
                    payload: response
                })
            }).catch((response) => {
                dispatchRequestUpdate(dispatch, action.payload.ID, 'REMOVE_PRODUCT_FROM_BASKET', 'success');
                next({
                    type: 'REMOVE_PRODUCT_FROM_BASKET_FAILURE',
                    payload: response
                })
            });
            break;
        }
        default:
            break;
    }
}
