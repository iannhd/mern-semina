import React, { useState } from 'react'
import {Container, Card, Button, Form} from 'react-bootstrap'
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import axios from 'axios'
import SAlert from '../../components/Alert';

function PageSignin() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form, "====> form")
    }

    const handleSubmit = async () => {
        try {
            console.log('masuk sini');
            const res = await axios.post('http://localhost:9000/api/v1/cms/auth/signin',
            {
                email: form.email,
                password: form.password
            })

            console.log(res, "=========>");
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
  return (
    <Container md={12}>
    <Card style={{ width: '50%' }} className='m-auto mt-5'>
      <Card.Body>
        {<SAlert message={'test'} type='danger'/>}
      <Form onSubmit={handleSubmit}>
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
        autocomplete='off'
        placeholder='Password..'
        />
        <SButton variant="primary" action={handleSubmit}>Submit</SButton>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
}

export default PageSignin