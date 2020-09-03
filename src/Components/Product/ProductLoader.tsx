import React from 'react';

import useRequestLoader from './useRequestLoader';
import Product from './Product';

interface IProps {
    id: string;
}

const ProductLoader: React.FC<IProps> = ({ id }) => {
    const [request] = useRequestLoader('FETCH_PRODUCT', id);

    return (
        <React.Fragment>
            {request && request.status === 'success' &&
                <Product product={request.data}></Product>
            }
            {request && request.status === 'pending' &&
                <div className="overlay overlay_pageloader">
                    <div className="spinner"></div>
                </div>
            }
        </React.Fragment >
    );
};

export default ProductLoader;