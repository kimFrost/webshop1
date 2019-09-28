import React, { useEffect } from 'react';
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";

import { Transition, TransitionGroup, CSSTransition } from 'react-transition-group'
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


/*
const getHomeTimeline = (node, delay) => {
    const timeline = new Timeline({ paused: true });
    const texts = node.querySelectorAll('h1 > div');
  
    timeline
      .from(node, 0, { display: 'none', autoAlpha: 0, delay })
      .staggerFrom(texts, 0.375, { autoAlpha: 0, x: -25, ease: Power1.easeOut }, 0.125);
  
    return timeline
  }

export const play = (pathname, node, appears) => {
    const delay = appears ? 0 : 0.5
    let timeline
  
    if (pathname === '/')
      timeline = getHomeTimeline(node, delay)
    else
      timeline = getDefaultTimeline(node, delay)
  
    timeline.play()
  }
*/

/*
const ANIMATION_DONE_EVENT = 'animation::done'
const triggerAnimationDoneEvent = (node: HTMLElement) =>
    node.dispatchEvent(new Event(ANIMATION_DONE_EVENT))

const createOpacityAnimationConfig = (animatingIn: any, duration: number = 500) => ({
    value: animatingIn ? [0, 1] : 0,
    easing: 'linear',
    duration: duration
})

const addEndListener = (node: HTMLElement, done: any) =>
    node.addEventListener(ANIMATION_DONE_EVENT, done)

const animateCardIn = (target: HTMLElement) => {
    anime({
        targets: target,
        opacity: createOpacityAnimationConfig(true, 500),
        translateY: [50, 0],
        complete: () => triggerAnimationDoneEvent(target)
    })
}
*/



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
                    <Route render={({ location }) => {
                        const { pathname, key } = location
                        return (
                            <TransitionGroup component={null}>
                                <CSSTransition
                                    key={key}
                                    classNames="route"
                                    unmountOnExit
                                    appear={true}
                                    //timeout={{ enter: 750, exit: 0 }}
                                    timeout={1000}
                                    >
                                    <Switch location={location}>
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
                                    </Switch>
                                </CSSTransition >
                            </TransitionGroup>
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


