import React, { useState } from 'react'
import {Container, Card, } from 'react-bootstrap'
import SAlert from '../../components/Alert';
import { useNavigate, Navigate} from 'react-router-dom';
import SForm from './form'
import {postData} from '../../utils/fetch'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../redux/auth/actions'
function PageSignin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            const res = await postData(`/cms/auth/signin`, form)    
            setIsLoading(false)
            dispatch(userLogin(res.data.data.token, res.data.data.role))
            navigate('/')
        } catch (error) {
            setAlert({
                status: true,
                message: error?.response?.data?.msg ?? 'Internal Server Error',
                type: 'danger'
            })
            setIsLoading(false)
        }
    }

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