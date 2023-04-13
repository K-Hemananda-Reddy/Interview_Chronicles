import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const FakeHome = () => {
    const Navigate=useNavigate();
    const redi=()=>{
        Navigate('/home');
    }
    useEffect(()=>{
        redi();
    },[])
  return (
    <div></div>
  )
}
