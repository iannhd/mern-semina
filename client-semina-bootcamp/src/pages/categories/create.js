import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import  SBreadcrumb  from '../../components/Breadcrumb'
import SAlert from '../../components/Alert'
import {useParams, useNavigate} from 'react-router-dom' 
import Form from './form'
import axios from 'axios'
import { config } from '../../configs'
import { postData } from '../../utils/fetch'


const CategoryCreate = () => {
    // const { token } = JSON.parse(localStorage.getItem('auth'))
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: ''
    })

    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
           const res = await postData('/cms/categories', form)


            navigate('/categories')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setAlert({
                status: true,
                type: 'danger',
                message: error.response.data.msg
            })
        }
    }
  return (
    <>
    <Container>
        <SBreadcrumb
        textSecond={'Categories'}
        urlSecond={'/categories'}
        textThird={'Create'}
        />
        {alert.status && <SAlert type={alert.type} message={alert.message}/>}
        <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
    </Container>
    </>
  )
}

export default CategoryCreate