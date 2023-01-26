import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Nav, Container, Navbar, Table} from 'react-bootstrap'
import SBreadCrumb from '../../components/Breadcrumb';
import SButton from '../../components/Button';
import SNavbar from '../../components/Navbar';
import axios from 'axios';
import {config} from '../../configs/index'

function Dashboard() {

  const token = localStorage.getItem('token')
  const [data, setData] = useState([])
  console.log(token, "=================>");

  const getCategoriesApi = async () => {
    try {
      const res = await axios.get(`${config.api_host_dev}/cms//categories`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      console.log(res.data.data)
      setData(res.data.data)
    } catch (error) {
      console.log(error); 
    }
  }
  
  useEffect(() => {
    getCategoriesApi()
    console.log(data, "=========> data from useEffect")
  }, [])  
  console.log(token, "=================>");

  if(! token) return <Navigate to='/signin' replace={true}/>

  return (
    <>
      <SNavbar />
      <Container className='mt-3'>
          <SBreadCrumb textSecond={'Categories'}/>
          <SButton>Tambah</SButton>
          <Table className='mt-3' striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>otto</td>
                <td>mdo</td>
              </tr>
            </tbody>
          </Table>
      </Container>
    </>
  )
}

export default Dashboard