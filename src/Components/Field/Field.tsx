import React, { useState, useEffect } from 'react';
import { useDebounce } from "../../Hooks/useDebounce";

interface IProps {
    value: string;
    debounce?: number;
    alignment?: string;
    onChange?: (value:any) => void;
}

const Field: React.FC<IProps> = ({ value, debounce, onChange, alignment, children }) => {
    const [fieldValue, setFieldValue] = useState<string>(value);
    const debouncedValue = useDebounce(fieldValue, debounce as number);

     /*
    - value
      - fieldValue = useState(value)
      *useEffect => setFieldValue(value)
        - debouncedValue = useDebounce(fieldValue)
          *useEffect => field.onChange()
      
    
    - value
      - fieldValue = useState(value)
      *useEffect => setFieldValue(value)
      - debouncedValue = useDebounce(value)
        *useEffect => field.onChange()
    
    */

    useEffect(() => {
        setFieldValue(value);
    }, [value]);

    useEffect(() => {
        if (onChange) onChange(fieldValue);
    }, [debouncedValue])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle change');
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