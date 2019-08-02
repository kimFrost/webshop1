import React from 'react';

interface IProps {
    msg: string,
    absolute?: boolean;
    direction?: string;
}

const Warning: React.FC<IProps> = ({ msg, absolute = false, direction = 'right' }) => {
    return (
        <div className={"warning" + (absolute ? " warning_absolute" : "") + (" warning_direction-" + direction)}>{msg}</div>
    );
};


export default Warning;
