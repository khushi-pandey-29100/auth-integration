import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import HomeLayout from '../layout/HomeLayout';
import PublicRoute from '../components/PublicRoute';
import { useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { setUser } from '../features/AuthSlice';
import { useDispatch } from 'react-redux';
import Mens from '../pages/Mens';
import Womens from '../pages/Womens';
import Kids from '../pages/Kids';
import Cart from "../pages/Cart";
import LandingPage from '../pages/LandingPage';
import CreateProduct from '../pages/CreateProduct';

const Approuter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let res = await axiosInstance.get("auth/current-user", {
          withCredentials: true,
        })
        if (res) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log("error in current user api", error)
      }
    })();
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: '/auth',
      element: <PublicRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
        },
      ],
    },
    {
      path: '/home',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <HomeLayout />,
          children: [
            {
              path: "",
              element: <Womens />
            },
            {
              path: "mens",
              element: <Mens />
            },
            {
              path: "kids",
              element: <Kids />
            },
            {
              path: "cart",
              element: <Cart />
            },
            {
              path: "create-product",
              element: <CreateProduct />
            }
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Approuter;
