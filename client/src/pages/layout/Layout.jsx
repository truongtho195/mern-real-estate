
import {useContext, useEffect} from "react"

import Navbar from "./../../components/navbar/Navbar.jsx"
import { AuthContext } from "../../context/AuthContext.jsx"

import "./Layout.css"
import { Navigate, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='layout'>
      <div className='navbar'> 
        <Navbar/>
      </div>
      <div className='content'>
        <Outlet/>
      </div>     
    </div>
  )
  
}

function RequiredAuth(){
  const {currentUser} = useContext(AuthContext);
  useEffect(()=>{
    if(!currentUser) <Navigate to="/login"/>
    
  })
  return (
    <div className='layout'>
      <div className='navbar'> 
        <Navbar/>
      </div>
      <div className='content'>
        <Outlet/>
      </div>     
    </div>
  )
}


export {Layout,RequiredAuth}


