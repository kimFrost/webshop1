import React from 'react';
import { IBasket } from '../../App.Types';
import { IBasketItem } from './../../App.Types';
import { Link } from 'react-router-dom';
import ImageLoader from './../ImageLoader/ImageLoader';
import Button from './../Button/Button';


interface IProps {
    basket: IBasket;
    show: boolean;
}

interface IMinibasketItemProps {
    item: IBasketItem;
}

const MiniBasketItem: React.FC<IMinibasketItemProps> = ({ item }) => {
    return (
        <div className="minibasketitem">
            <div className="minibasketitem__image">
                <ImageLoader src={item.media.src} />
            </div>
            <div className="minibasketitem__info">
                <div className="minibasketitem__title">{item.title}</div>
                <div className="minibasketitem__quantity">{item.quantity}</div>
                <div className="minibasketitem__multiplier">x</div>
                <div className="minibasketitem__price price">{item.price.formatted}</div>
            </div>
        </div>
    );
}

const MiniBasket: React.FC<IProps> = ({ basket, show }) => {

    return (
        <React.Fragment>
            <div className={"minibasket" + (show ? " minibasket_show" : "")}>
                {basket.items.length ?
                    <React.Fragment>
                        <div className="minibasket__items">
                            {
                                basket.items.map((item) =>
                                    <MiniBasketItem key={item.ID} item={item}></MiniBasketItem>
                                )
                            }
                        </div>
                        <div className="minibasket__total">
                            <div className="minibasket__total-text">
                                Total: 
                            </div>
                            <div className="minibasket__total-value price">
                                {basket.total.formatted}</div>
                            </div>
                    </React.Fragment >
                    :
                    <div>Basket is empty</div>
                }
                <div className="minibasket__goto">
                    <Button solid={true}>
                        <Link to="/basket">Gå til kurv</Link>
                    </Button>
                </div>
            </div>
        </React.Fragment >

    );
};

export default MiniBasket;