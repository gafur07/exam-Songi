import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  return (
    <div className='flex  gap-4 w-full h-screen'>
        <div className='w-[20%]'>
            <Sidebar />
        </div>
        <div className='flex flex-col gap-4 w-full'> 
        <Header />
        <Outlet />
        </div>
    </div>
  )
}

export default Layout