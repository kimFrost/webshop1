import React, { useEffect } from 'react';
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import Spinner from './Components/Spinner/Spinner';
import ProductCard from './Components/ProductCard/ProductCard';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ProductPage from './Pages/ProductPage';
import BasketPage from './Pages/BasketPage';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './reduxStore/reducer'
import { loadProducts } from './reduxStore/middleware';
import Header from './Components/Header/Header';
import MobileMenu from './Components/MobileMenu/MobileMenu';
import { IProduct, ICta } from './App.Types';
import Cta from './Components/Cta/Cta';


const App: React.FC<RouteComponentProps> = ({ history }) => {

    const state = useSelector((state: IState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        // return unlisten function for cleanup
        return history.listen(() => {
            if (state.showMobileMenu) {
                dispatch({
                    type: 'TOGGLE_MOBILEMENU',
                    payload: false
                })
            }
        });
    }, [])

    useEffect(() => {
        dispatch({
            type: 'FETCH_BASKET'
        });
        //dispatch(loadProducts());
        dispatch({
            type: 'FETCH_PAGE_DATA'
        })
    }, [])

    return (
        <div className="app">
            <MobileMenu />
            <Header state={state} />
            <div className="app__body">
                {state.isFetchingPageData &&
                    <div className="overlay overlay_pageloader">
                        <Spinner isLoading={true} />
                    </div>
                }
                <div className="content">
                    <Route path="/" exact render={
                        () => (
                            <div className="product-grid">
                                {state.pageBlocks.map(item => {
                                    if (item.type === 'product') {
                                        const product = item.payload as IProduct;
                                        return <ProductCard product={product} key={product.ID} />
                                    }
                                    else if (item.type === 'cta') {
                                        const cta = item.payload as ICta;
                                        return <Cta cta={cta} key={cta.ID} />
                                    }
                                    else return null
                                }
                                )}
                            </div>
                        )
                    } />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/basket" component={BasketPage} />
                    <Route path="/product/:id" render={(props) => {
                        return (
                            <ProductPage id={props.match.params.id}></ProductPage>
                        )
                    }} />

                </div>
            </div>
            <footer className="app__footer">
                <div className="content">
                    <p>This site is only for demonstration purposes</p>
                    <p>No products can be bought or ordered</p>
                    <p>But thanks for looking :)</p>
                </div>
            </footer>
        </div>
    );
}

export default withRouter(App);


