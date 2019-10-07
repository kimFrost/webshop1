import React, { useState, useRef } from 'react';
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
    const timeoutRefId = useRef<any>();

    const handleOnClick = () => {
        clearTimeout(timeoutRefId.current);
        setClicked(false)
        timeoutRefId.current = setTimeout(() => {
            setClicked(false)
        }, 5000);
        setTimeout(() => {
            setClicked(true)
        }, 0);
        if (onClick) onClick();
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => clearTimeout(timeoutRefId.current);
    }, [])

    return (
        <button
            className={"button" + 
            (solid ? " button_solid" : "") + 
            (pending ? " button_pending" : "") + 
            (clicked ? " button_clicked" : "") + 
            (fill ? " button_fill" : "")}
            onClick={handleOnClick} 
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