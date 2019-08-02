import React, { useState } from 'react';
import { IState } from '../../reduxStore/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface IProps {
   
}

const MobileMenu: React.FC<IProps> = () => {

    const show = useSelector((state: IState) => state.showMobileMenu);
    const dispatch = useDispatch();

    return (
        <div className={"mobilemenu" + (show ? " mobilemenu_show" : "")}>
            <div className="mobilemenu__content">
                <nav className="mobilemenu__nav">
                    <Link to="/" className="mobilemenu__navitem">
                        Home
                    </Link>
                    <Link to="/about/" className="mobilemenu__navitem">
                        About
                    </Link>
                    <Link to="/contact/" className="mobilemenu__navitem">
                        Contact
                    </Link>
                </nav>
            </div>
            <div className="mobilemenu__background overlay overlay_behind" onClick={() => dispatch({type: 'TOGGLE_MOBILEMENU'})}></div>
        </div>
    );
};


export default MobileMenu;
