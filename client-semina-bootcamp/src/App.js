
import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import React from 'react';
import PageSignin from './pages/signin';
import PageDashboard from './pages/dashboard'
import PageCategories from './pages/categories'
function App() {

  
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <PageDashboard/> }/>
          <Route path="/signin" element={<PageSignin />}/>
          <Route path="/categories" element={<PageCategories />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
