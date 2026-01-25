import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
   let {user}= useSelector((state)=>state.auth);

   if(!user){
    return <Navigate to="/"/>
   }
  return <Outlet /> 
}

export default ProtectedRoute