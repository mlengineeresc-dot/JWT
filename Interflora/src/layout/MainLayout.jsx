import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import { Outlet } from 'react-router'
import Footer from "../components/Footer"


const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout