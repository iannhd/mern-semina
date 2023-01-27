
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import React, { useEffect } from 'react';
import {listen} from './redux/listener'
import { AppRoutes } from './routes'

function App() {
  
  useEffect(()=>{
    listen()
  })
  
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
