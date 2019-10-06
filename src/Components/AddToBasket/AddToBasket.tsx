import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reduxStore/reducer';
import Button from './../Button/Button';
import { IBasketItem } from './../../App.Types';
import { useRequestSelector } from './../../Hooks/useRequestSelector';
import Spinner from './../Spinner/Spinner';
import { useDebounce } from '../../Hooks/useDebounce';
import Field from '../Field';

interface IProps {
    productID: string;
}

interface AddToBasketCouterProps {
    item: IBasketItem;
}

export const AddToBasketCouter: React.FC<AddToBasketCouterProps> = ({ item }) => {
    const [count, setCount] = useState<string>(item.quantity.toString());
    //const [count, setCount] = useState<number>(item.quantity);
    //const [countString, setCountString] = useState<string>(count.toString());

    const requestSetQuantity = useRequestSelector({ group: 'SET_PRODUCT_QUANTITY', ID: item.ID });
    const requestDecrease = useRequestSelector({ group: 'DECREASE_PRODUCT_QUANTITY', ID: item.ID });
    const requestIncrease = useRequestSelector({ group: 'INCREASE_PRODUCT_QUANTITY', ID: item.ID });
    const pending =
        (requestSetQuantity && requestSetQuantity.status === 'pending') ||
        (requestDecrease && requestDecrease.status === 'pending') ||
        (requestIncrease && requestIncrease.status === 'pending');

    const dispatch = useDispatch();

    const debouncedCount = useDebounce(count, 500);


    const dispatchSetProductQuantity = (value: number) => {
        dispatch({
            type: 'SET_PRODUCT_QUANTITY',
            payload: {
                ID: item.ID,
                quantity: value
            }
        })
    }

    useEffect(() => {
        console.log('debouncedCount changed', debouncedCount)
        if (debouncedCount) {
            //dispatchSetProductQuantity(parseInt(debouncedCount))
        }
    }, [debouncedCount]);

    useEffect(() => {
        console.log('count changed', count)
    }, [count]);

    // Disable to prevent change count on request responses
    /*
    useEffect(() => {
        setCount(item.quantity.toString()); 
    }, [item.quantity]);
    */

    return (
        <React.Fragment>
            <div className="combine">
                <Button onClick={() => {
                    setCount((parseInt(count) - 1).toString());
                    dispatch({
                        type: 'DECREASE_PRODUCT_QUANTITY',
                        payload: item.ID
                    })
                }}>-</Button>
                <Field
                    value={count}
                    debounce={500}
                    alignment="center"
                    onChange={(value) => {
                        console.log('field onChange!!!')
                        setCount(value);
                    }}>
                    <Spinner isLoading={pending} />
                </Field>

                <Button onClick={() => {
                    setCount((parseInt(count) + 1).toString());
                    dispatch({
                        type: 'INCREASE_PRODUCT_QUANTITY',
                        payload: item.ID
                    })
                }}>+</Button>
            </div>
        </React.Fragment>
    )
}

const AddToBasket: React.FC<IProps> = ({ productID }) => {
    const itemInCart = useSelector((state: IState) => state.basket.items.find((item) => item.ID === productID));
    const request = useRequestSelector({ group: 'ADD_PRODUCT_TO_BASKET', ID: productID });
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {itemInCart ?
                <AddToBasketCouter item={itemInCart}></AddToBasketCouter>
                :
                <Button solid={true} fill={true} onClick={() => {
                    dispatch({
                        type: 'ADD_PRODUCT_TO_BASKET',
                        payload: productID
                    })
                }} pending={request && request.status === 'pending'}>Add to cart </Button>
            }
        </React.Fragment>
    );
};

export default AddToBasket;
