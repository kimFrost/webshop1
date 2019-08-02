
import { useState, useEffect } from 'react';

let getPosition = () => ({
    x: window.pageXOffset,
    y: window.pageYOffset,
})

export const useScrollPosition = (delay: number = 500) => {
    let [position, setPosition] = useState(getPosition())

    useEffect(() => {
        /*
        const handleScroll = throttle(() => {
            setPosition(getPosition())
        }, delay);
        */
        const handleScroll = () => {
            setPosition(getPosition())
        }
        window.addEventListener(
            'scroll',
            handleScroll
        )
        return () => {
            //handleScroll.cancel();
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return position;
}