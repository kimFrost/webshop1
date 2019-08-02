import React from 'react';
import Basket from './../Components/Basket/Basket';
import { useSelector } from 'react-redux';
import { IState } from '../reduxStore/reducer';

const BasketPage: React.FC = ({ children }) => {
    const basket = useSelector((state: IState) => state.basket);

    return (
        <div>
            <Basket basket={basket} />
        </div>
    );
}

export default BasketPage;
