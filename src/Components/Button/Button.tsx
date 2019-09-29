import React, { useState } from 'react';
import Spinner from './../Spinner/Spinner';
import { useEffect } from 'react';

interface IProps {
    onClick?: () => void;
    solid?: boolean;
    fill?: boolean;
    pending?: boolean;
    disabled?: boolean;
    [x: string]: any;
}

const Button: React.FC<IProps> = ({ onClick , solid, pending = false, disabled = false, fill, children, ...props }) => {
    const [clicked, setClicked] = useState(false);
    return (
        <button
            className={"button" + 
            (solid ? " button_solid" : "") + 
            (pending ? " button_pending" : "") + 
            (clicked ? " button_clicked" : "") + 
            (fill ? " button_fill" : "")}
            onClick={() => {
                setClicked(true)
                setTimeout(() => {
                    setClicked(false)
                }, 500);
                if (onClick) onClick();
            }} 
            {...props}
            disabled={pending || disabled}>
            <div className="button__content">
                {children}
            </div>
            <div className="button__spinner">
                <Spinner isLoading={pending} />
            </div>
        </button>
    );
};

Button.defaultProps = {
    onClick: () => { },
    solid: false,
    fill: false,
    pending: false,
    disabled: false
}

export default Button;