import React from 'react'
import { useIntersect } from '../../Hooks/useIntersect';
import { useState } from 'react';
//import { ReactComponent as PlaceholderImage } from '../../Resources/no-image.svg';
import Spinner from './../Spinner/Spinner';

interface IProps {
    src: string;
}

const ImageLoader: React.FC<IProps> = ({ src }) => {
    const [ref, entry] = useIntersect({ threshold: 0 });
    const [state, setState] = useState({
        triggered: false,
        show: false
    });

    if (!state.triggered && (entry as any).intersectionRatio > 0) {
        setState({
            ...state,
            triggered: true
        })
    }

    return (
        <React.Fragment>
            <img
                src={(state.triggered ? src : "")}
                ref={ref as any}
                onLoad={() => setTimeout(() => {
                    setState({
                        ...state,
                        show: true
                    })
                }, Math.random() * (1200 - 300) + 300)}
                className={"lazy image" + (state.show ? " shown" : " hidden")} />
            <Spinner isLoading={!state.show}></Spinner>
        </React.Fragment>

    );
}

export default ImageLoader;
