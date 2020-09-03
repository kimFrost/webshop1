import React, { useEffect } from 'react';
import { IProduct } from '../../App.Types';
//import { useDispatch } from 'react-redux';
//import useRequestLoader from './useRequestLoader';
//import Button from './../Button/Button';
import ImageLoader from './../ImageLoader/ImageLoader';
import AddToBasket from './../AddToBasket/AddToBasket';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface IProps {
    product: IProduct;
}

const Product: React.FC<IProps> = ({ product }) => {
    //const dispatch = useDispatch();
    //const [request] = useRequestLoader('ADD_PRODUCT_TO_BASKET', product.ID);
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                in={true}
                classNames="product"
                unmountOnExit
                appear={true}
                timeout={1000}
            >
                <div className="product">
                    <div className="product__image">
                        <ImageLoader src={product.media.src} />
                    </div>
                    <div className="product__info">
                        <div className="product__title">
                            {product.title}
                        </div>
                        <div className="product__id">
                            {product.ID}
                        </div>
                        <div className="product__price price">
                            {product.price.formatted}
                        </div>
                        <div className="product__actions">
                            <AddToBasket productID={product.ID} />
                        </div>
                        <ul className="product__desc">
                            <li>Nunc dignissim risus id metus.</li>
                            <li>Cras ornare tristique elit.</li>
                            <li>Vivamus vestibulum ntulla nec ante.</li>
                            <li>Praesent placerat risus quis eros.</li>
                            <li>Fusce pellentesque suscipit nibh.</li>
                        </ul>
                    </div>
                </div>
            </CSSTransition>

        </TransitionGroup>
    );
}

export default Product;
