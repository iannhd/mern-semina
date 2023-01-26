import React from "react";
import { PropTypes } from 'prop-types'
export default function Input({type, name, value, onChange}){
    return <input type={type} name={name} value={value} onChange={onChange}/>
}
    
    
Input.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}