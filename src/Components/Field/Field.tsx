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
    //const debouncedValue = useDebounce(staticValue, debounce as number);

    /*
    const is_first_render = useRef(true);
    useEffect(() => {
        is_first_render.current = false;
    }, []);
    */

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
   

       only trigger onChange after debounced value change done by change html event

       else set value by external will trigger onChange

       incrementer set value and field is rendered with new value. This should not trigger onchange event

       on start 
   */

    useEffect(() => {
        setFieldValue(value);
    }, [value]);

    /*
    useEffect(() => {
        console.log('FIELD:debouncedValue')
        if (onChange) onChange(fieldValue);
    }, [debouncedValue])
    */

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



//https://stackoverflow.com/questions/57547582/useeffect-with-debounce
//https://overreacted.io/a-complete-guide-to-useeffect/