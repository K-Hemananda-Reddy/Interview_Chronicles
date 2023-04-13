import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom';
// import { Profile } from './Profile';

export const Home = () => {
  return (
    <>
      <Navbar />
      
      <Outlet />
    </>

  )
}
