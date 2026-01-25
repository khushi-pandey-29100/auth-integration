import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    let {user}= useSelector((state)=>state.auth);

    if(user){
        return <Navigate to="/home" />
    }
  return (
    <Outlet />
  )
}

export default PublicRoute;