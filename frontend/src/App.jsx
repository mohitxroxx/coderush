import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import Home from './component/Home'
import background from './assets/background.png'
import Login from './component/Login' 

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";



function App() {
  const [count, setCount] = useState(0)
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'auto', // Adjust as needed
   
  };

  const Layout = () => {
    return(
      <div className='app'>
   
      <Header/>
      <Outlet/>
  
   
    </div> 
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Login />,
      },
        {
          path: '/home', // You can customize the path for the home page
          element: <Home />,
        },
        
      ],
  },
]);





  return (
    <div className="custom-scrollbar" style={containerStyle}>
       <RouterProvider router={router} />
        
    </div>
  )
}

export default App
