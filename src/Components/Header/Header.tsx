import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '../../Hooks/useScrollPosition';
import { ReactComponent as Logo } from '../../Resources/logo-7-trimmed.svg';
import { ReactComponent as CartIcon } from '../../Resources/shopping-cart.svg';
import { IState } from '../../reduxStore/reducer';
import MiniBasket from './../MiniBasket/MiniBasket';
import Warning from './../Warning/Warning';

interface IProps {
    state: IState
}

const Header: React.FC<IProps> = ({ state }) => {

    const [showMiniBasket, setShowMinibasket] = useState(false);
    const [itemsAdded, setTtemsAdded] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const scrollPosition = useScrollPosition();
    const dispatch = useDispatch();

    const handleHideMiniBasket = () => {
        setTimer(setTimeout(() => {
            setShowMinibasket(false)
        }, 500));
    };

    const handleShowMinibasket = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setShowMinibasket(true);
    }

    useEffect(() => {
        setTtemsAdded(true);
        setTimeout(() => {
            setTtemsAdded(false);
        }, 500);
    }, [state.basket.itemsInBasket])

    return (
        <header className={"app__header header" + (scrollPosition.y > 120 ? " header_collapse" : "")}>
            <div className="header__meta">

            </div>
            <div className="header__upper">
                <div className="content">
                    <div className="header__mobilemenu">
                        <div className="burger" onClick={() => dispatch({
                            type: 'TOGGLE_MOBILEMENU',
                        })}>
                            <div className="burger__lines"></div>
                        </div>
                    </div>
                    <div className="header__logo-upper">
                        <Link to="/">
                            <Logo className="logo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 119 27" />
                        </Link>
                    </div>
                    <div className="header__search">
                        <input className="field" type="text" placeholder="Søg..." />
                        <Warning msg={"Undskyld! Søgning er ikke implementeret endnu"} />
                    </div>
                    <Link to="/basket" className="header__basket-upper"
                        onMouseEnter={() => handleShowMinibasket()}
                        onMouseLeave={() => handleHideMiniBasket()}>
                        <div className="price">{state.basket.total.formatted}</div>
                        <div className="anchor">
                            <CartIcon preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64" />
                            <div className={"bubble" + (itemsAdded ? " bubble_pop" : "")}>{state.basket.itemsInBasket}</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="header__lower">
                <div className="content">
                    <div className="header__logo-lower">
                        <Link to="/">
                            <Logo className="logo" preserveAspectRatio="xMidYMid meet" viewBox="0 0 119 27" />
                        </Link>
                    </div>
                    <nav className="header__navigation">
                        <Link to="/">Home</Link>
                        <Link to="/about/">About</Link>
                        <Link to="/contact/">Contact</Link>
                    </nav>
                    <Link to="/basket" className="header__basket-lower"
                        onMouseEnter={() => handleShowMinibasket()}
                        onMouseLeave={() => handleHideMiniBasket()}>
                        <div className="price">{state.basket.total.formatted}</div>
                        <div className="anchor">
                            <CartIcon preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64" />
                            <div className={"bubble" + (itemsAdded ? " bubble_pop" : "")}>{state.basket.itemsInBasket}</div>
                        </div>
                    </Link>

                </div>
            </div>
            <div className="header__attach-line">
                <div className="content">
                    <div className="anchor">
                        <MiniBasket basket={state.basket} show={showMiniBasket}></MiniBasket>
                    </div>
                </div>
            </div>
        </header>
    );
};


export default Header;
