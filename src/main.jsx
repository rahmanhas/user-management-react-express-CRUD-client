import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from './Layout/MainLayout';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import ViewUser from './Pages/ViewUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/addupdateuser', element: <AddUser/>},
      {path: '/updateuser/:id', element: <AddUser/>},
      {path: '/user/:id', element: <ViewUser/>},
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);