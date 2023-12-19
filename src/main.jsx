import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Today from './today.jsx';
import Setting from './setting.jsx';
import Dashboard from './dashboard.jsx'
// import './index.css'

import { createBrowserRouter,RouterProvider, } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/today",
        element: <Today />
      }, 
      {
        path: "/",
        element: <Setting />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
