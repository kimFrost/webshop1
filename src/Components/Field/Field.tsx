import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from "../../Hooks/useDebounce";

interface IProps {
    value: string;
    debounce?: number;
    alignment?: string;
    onChange?: (value: any) => void;
}

const Field: React.FC<IProps> = ({ value, debounce, onChange, alignment, children }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const fieldChanged = useRef(false);

    useEffect(() => {
        setFieldValue(value);
    }, [value]);

    useEffect(() => {
        const handle = setTimeout(() => {
            if (fieldChanged.current === true) {
                fieldChanged.current = false;
                if (onChange) onChange(fieldValue);
            } 
        }, 500)
        return () => {
            clearTimeout(handle);
        }
    }, [fieldValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldChanged.current = true;
        setFieldValue(e.target.value);
    }

    return (
        <div className={"field "}>
            <input className={alignment} value={fieldValue} onChange={handleChange} />
            {children}
        </div>
    )
}

Field.defaultProps = {
    onChange: () => { },
    debounce: 0,
    alignment: ""
}

export default Field;