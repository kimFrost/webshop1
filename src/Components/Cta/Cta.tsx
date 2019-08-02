import React from 'react';
import { useIntersect } from '../../Hooks/useIntersect';
import { ICta } from '../../App.Types';


interface IProps {
    cta: ICta;
}

const Cta: React.FC<IProps> = ({ cta }) => {
    const [ref, entry] = useIntersect({ threshold: 0 });
    return (
        <div className={"cta" + ((entry as any).intersectionRatio > 0 ? " cta_inview" : "")} ref={ref as any}>
            <h1 className="cta__line1">{cta.line1}</h1>
            <p className="cta__line2">{cta.line2}</p>
        </div>
    );
};

export default Cta;