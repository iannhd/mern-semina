import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Nav, Container, Navbar, Table, Spinner} from 'react-bootstrap'
import SBreadCrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import SNavbar from '../../components/Navbar';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {config} from '../../configs/index'

function PageCategories() {
  const navigate = useNavigate()
  const token = localStorage.getItem('auth')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log(token, "=================>");

  const getCategoriesApi = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setData(res.data.data)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      //logger
      console.log(error); 
    }
  }
  
  useEffect(() => {
    getCategoriesApi()

  }, [])  
  

  if(! token) return <Navigate to='/signin' replace={true}/>

  return (
    <>
      <SNavbar />
      <Container className='mt-3'>
          <SBreadCrumb textSecond={'Categories'}/>
          <SButton action={() => navigate('/categories/create')}>Tambah</SButton>
          <Table className='mt-3' striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={data.length + 1} style={{textAlign: "center"}}>
                    <span className='flex justify-content-center align-items-center'>
                        <Spinner animation='grow' variant='light' />
                    </span>
                  </td>
                </tr>
              ) : (
                data.map((data, index)=> (
                  <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Acton</td>
                </tr>
                ))
              ) }
            </tbody>
          </Table>
      </Container>
    </>
  )
}

export default PageCategories