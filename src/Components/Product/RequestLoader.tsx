import React, { useContext, useState } from 'react';

import useRequestLoader from './useRequestLoader';

interface IProps {
    id: string;
    group: string;
}

const RequestLoader: React.FC<IProps> = ({ id, group, children }) => {
    const [request] = useRequestLoader(group, id);

    return (
        <React.Fragment>
            {request &&
                request.status === 'success' ?
                { children }
                : null
            }
        </React.Fragment >
    );
};

export default RequestLoader;