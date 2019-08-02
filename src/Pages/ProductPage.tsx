import React, { useEffect } from 'react';
import ProductLoader from './../Components/Product/ProductLoader';
import { useDispatch } from 'react-redux';

interface IProps {
  id: string;
}

const ProductPage: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'FETCH_PRODUCT',
      payload: id
    });
  }, [])
  return (
    <ProductLoader id={id}></ProductLoader>
  );
}

export default ProductPage;