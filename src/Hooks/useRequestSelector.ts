import { useSelector } from 'react-redux';
import { IState } from '../reduxStore/reducer';


interface IAugs {
    group: string,
    ID: string;
}

export const useRequestSelector = ({ group, ID }:IAugs) => {
    const selector = `${group}:${ID}`;
    const request = useSelector((state: IState) => state.requests[selector]);
    return request
}