import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'
import NavLink from '../NavLink'
const SNavbar = () => {
    let navigate = useNavigate()
  return (
    <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Semina</Navbar.Brand>
          <Nav className='me-auto'>
            <NavLink action={() => navigate('/')}>Home</NavLink>
            <NavLink action={() => navigate('/categories')}>Categories</NavLink>
            <NavLink action={() => navigate('/talents')}>Talents</NavLink>
            <NavLink action={() => navigate('/events')}>Events</NavLink>
            <NavLink action={() => navigate('/participant')}>Participant</NavLink>
            <NavLink action={() => navigate('/transaction')}>Transaction</NavLink>
          </Nav>
        </Container>
      </Navbar >
  )
}

export default SNavbar