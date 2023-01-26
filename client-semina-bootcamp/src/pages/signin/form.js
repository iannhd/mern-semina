import React from 'react'
import SButton from '../../components/Button'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import {Form} from 'react-bootstrap'

const SForm = ({form, handleChange,  handleSubmit, isLoading}) => {
  return (
    <Form>
    <TextInputWithLabel
    label='Email address'
    name='email'
    value={form.email}
    type='email'
    onChange={handleChange}
    placeholder="Enter your email..."
    />
    <TextInputWithLabel
    label='Password'
    name='password'
    value={form.password}
    type='password'
    onChange={handleChange}
    autoComplete='off'
    placeholder='Password..'
    />
    <SButton loading={isLoading} disabled={isLoading} variant="primary" action={handleSubmit}>Submit</SButton>
    </Form>
  )
}

export default SForm