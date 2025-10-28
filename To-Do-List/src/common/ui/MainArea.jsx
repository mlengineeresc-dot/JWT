import React from 'react'
import { Outlet } from 'react-router'

const MainArea = () => {
  return (
    <div className='w-full flex justify-center items-center bg-slate-100'>
        <Outlet />
    </div>
  )
}

export default MainArea