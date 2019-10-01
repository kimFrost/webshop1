import React from 'react';
import { IBasket, IBasketItem } from '../../App.Types';
import { useDispatch } from 'react-redux';
import ImageLoader from './../ImageLoader/ImageLoader';
import { AddToBasketCouter } from './../AddToBasket/AddToBasket';
import Button from './../Button/Button';
import Warning from './../Warning/Warning';
import { useRequestSelector } from './../../Hooks/useRequestSelector';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


interface IProps {
    basket: IBasket;
}

interface IBasketItemProps {
    item: IBasketItem;
}

const BasketItem: React.FC<IBasketItemProps> = ({ item }) => {

    const requestRemove = useRequestSelector({ group: 'REMOVE_PRODUCT_FROM_BASKET', ID: item.ID });
    const dispatch = useDispatch()

    return (
        <div className="basketitem">
            <div className="basketitem__image">
                <ImageLoader src={item.media.src} />
            </div>
            <div className="basketitem__title">{item.title}</div>
            <div className="basketitem__quantity">
                <AddToBasketCouter item={item} />
            </div>
            <div className="basketitem__multiplier">x</div>
            <div className="basketitem__price price">{item.price.formatted}</div>
            <div className="basketitem__remove">
                <Button onClick={() => {
                    dispatch({
                        type: 'REMOVE_PRODUCT_FROM_BASKET',
                        payload: {
                            ID: item.ID
                        }
                    })
                }} pending={requestRemove && requestRemove.status === 'pending'}>X</Button>
            </div>
        </div>
    );
}

const Basket: React.FC<IProps> = ({ basket }) => {
    return (
        <div className="basket">
            {basket.items.length ?
                <React.Fragment>
                    <div className="basket__items">
                        <TransitionGroup component={null}>
                            {
                                basket.items.map((item) =>
                                    <CSSTransition
                                        key={item.ID}
                                        classNames="fade"
                                        timeout={500}
                                        enter={false}
                                        unmountOnExit
                                    >
                                        <BasketItem key={item.ID} item={item} />
                                    </CSSTransition>

                                )
                            }
                            </TransitionGroup>
                    </div>
                        <div className="basket__total">
                            <div className="basket__total-text">
                                Total:
                            </div>
                            <div className="basket__total-value price">
                                {basket.total.formatted}</div>
                        </div>
                        <div className="basket__bottombar">
                            <div className="anchor">
                                <Button solid={true} disabled={true}>
                                    Go to checkout
                            </Button>
                                <Warning absolute={true} msg="Undskyld! Checkout er ikke implementeret endnu" direction="left" />
                            </div>
                        </div>
                </React.Fragment >
                    :
                <div>Basket is empty</div>
                    }
        </div>

    );
        };
        
export default Basket;