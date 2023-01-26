
import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import React from 'react';
import PageSignin from './pages/signin';
function App() {

  
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <>home</> }/>
          <Route path="/login" element={<PageSignin />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
