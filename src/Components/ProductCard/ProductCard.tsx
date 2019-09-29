import React, { useContext, useState, useEffect } from 'react';
import { IProduct } from '../../App.Types';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../reduxStore/reducer';
import ImageLoader from './../ImageLoader'
import Button from './../Button/Button';
import { Link } from 'react-router-dom';
import AddToBasket from './../AddToBasket/AddToBasket';
import { useIntersect } from './../../Hooks/useIntersect';

interface IProps {
    product: IProduct;
    onResourcesLoaded?: () => void;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
    const request = useSelector((state: IState) => state.requests[product.ID]);
    const [ref, entry] = useIntersect({ threshold: 0 });
    const [inView, setInView] = useState(false);

    useEffect(() => {
        let timer:any = null;
        if ((entry as any).intersectionRatio > 0) {
            timer = setTimeout(() => {
                setInView(true);
            }, Math.random() * 500 + 0); 
        }
        else {
            setInView(false);
        }
        return () => clearTimeout(timer);
    }, [(entry as any).intersectionRatio]);

    let status = null;
    if (request) {
        status = request.status
    }

    return (
        <React.Fragment>
            <div className={"productcard" + (inView ? " productcard_inview" : "")} ref={ref as any} >
                <Link to={`/product/${product.ID}`}>
                    {product.media &&
                        <div className="productcard__image">
                            <ImageLoader src={product.media.src}></ImageLoader>
                        </div>
                    }
                    <div className="productcard__body">
                        <h1 className="title">{product.title}</h1>
                        <p className="desc">{product.desc}</p>
                        <p className="price">{product.price.formatted}</p>
                        <div>{status}</div>
                    </div>
                </Link>
                <div className="productcard__footer">
                    <AddToBasket productID={product.ID}></AddToBasket>
                </div>
            </div>
        </React.Fragment >

    );
};

ProductCard.defaultProps = {
    onResourcesLoaded: () => {}
}

export default ProductCard;