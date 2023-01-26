import React from 'react'
import { Form } from 'react-bootstrap'
const TextInputWithLabel = ({
    label,
    name,
    value,
    type,
    onChange,
    placeholder,
    autoComplete
}) => {
  return (
    <Form.Group className="mb-2">
    <Form.Label>{label}</Form.Label>
        <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        />
    </Form.Group>
  )
}

export default TextInputWithLabel