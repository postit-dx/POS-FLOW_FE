import React from 'react';
import '../styles/css/vehicle/SearchForm.css';

export function InputField({label, type, value, onChange, className, placeholder}) { /* form에서 사용하는 input field */
    return(
        <div>
            <label>{label}</label>
            <input 
                type={type}
                value={value}
                className={className}
                onChange={onChange}
                placeholder={placeholder}/>
        </div>
    )
}

export function SelectField({label, className, onChange, options}) {
    return (
        <div>
            <label>{label}</label>
            <select
                className={className}
                onChange={(e) => onChange(e.target.value)}>
                    
                </select>
        </div>
    )
}