import React, { useState } from 'react'
import {Container, Card, } from 'react-bootstrap'
import axios from 'axios'
import SAlert from '../../components/Alert';
import { useNavigate, Navigate} from 'react-router-dom';
import SForm from './form'

import {config} from '../../configs/index'

function PageSignin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [ alert, setAlert ] = useState({
        status: false,
        message: '',
        type: 'danger'
    })
    
    const [ isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form, "====> form")
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setAlert({
            status: false
        })
        try {
            const res = await axios.post(`${config.api_host_dev}/cms/auth/signin`, form)    
            setIsLoading(false)
            localStorage.setItem('token', res.data.data.token)
            navigate('/')
        } catch (error) {
            // console.log(error.response.data.msg);
            setAlert({
                status: true,
                message: error?.response?.data?.msg ?? 'Internal Server Error',
                type: 'danger'
            })
            setIsLoading(false)
        }
    }

    if(token) return <Navigate to='/' />
  return (
    <Container md={12} className='my-5'>
      <div className='m-auto' style={{width: "50%"}}>
      {alert.status && <SAlert message={alert.message} type={alert.type}/>}
      </div>
    <Card style={{ width: '50%' }} className='m-auto mt-5'>
        <Card.Body>
            <SForm 
            handleChange={handleChange} 
            isLoading={isLoading} 
            handleSubmit={handleSubmit}
            form={form} 
            />
        </Card.Body>
    </Card>
    </Container>
  );
}

export default PageSignin