import { useState, useRef, useEffect } from 'react'


interface IAugs {
    root?: any,
    rootMargin?: string;
    threshold?: number|Array<number>;
}

export const useIntersect = ({ root = null, rootMargin = '0px', threshold = 0 }:IAugs) => {
    const [entry, updateEntry] = useState({});
    const [node, setNode] = useState<null | Element>(null);

    const observerRef = useRef<null | IntersectionObserver>(null);

    useEffect(
        () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            observerRef.current = new IntersectionObserver(
                ([entry]) => updateEntry(entry),
                {
                    root,
                    rootMargin,
                    threshold
                }
            );

            const { current: currentObserver } = observerRef;
            if (node) {
                currentObserver.observe(node);
            }
            return () => currentObserver.disconnect();
        },
        [node, root, rootMargin, threshold]
    )
    return [setNode, entry];
}