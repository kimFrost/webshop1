import React from 'react';

interface IProps {
    isLoading: boolean;
}

const Spinner: React.FC<IProps> = ({ isLoading }) => {
    return (
        isLoading ? (
            <div className="overlay overlay_transparent">
                <div className="spinner"></div>
            </div>
        ) : null
    )
}


export default Spinner;