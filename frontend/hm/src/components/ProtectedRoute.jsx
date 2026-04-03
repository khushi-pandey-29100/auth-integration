import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  if (user===null) {
    return <Navigate to="/auth" replace />
  }

  return <Outlet />
}

export default ProtectedRoute