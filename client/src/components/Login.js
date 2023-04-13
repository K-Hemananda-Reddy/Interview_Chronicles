import React, { useState } from 'react'
import "../static/Login.css"
import "../static/utils.css"
import  image from "../static/img/signupbg.jpg"

import { Link, useNavigate } from 'react-router-dom';
export const Login = () => {
  const [rollno,setRollno]=useState('');
  const [password,setPassword]=useState('');
  const Navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch(`/login`,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
  
            },
            body:JSON.stringify({rollno,password})
          })
          const json=await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            Navigate("/home")
            alert("Logged in successfully")
          }
          else{
            alert("Invalid Details")
          }
  }
  return (
    <>
    <img className=""src={image} alt="" />
    <div className='cont mt-5 d-flex flex-column bg_col justify-content-center container border p-3 border-2'>
      <h1 className='text-center logttl' style={{"overflow" : "hidden"}}>Login</h1>
      <div className="container con">
      <form onSubmit={handleSubmit} className='formFlex'>
        <label htmlFor="rollno">Roll No :</label>
        <input value={rollno} onChange={e=>{setRollno(e.target.value)}} className='inp' type="text" id='rollno' placeholder='Enter Your Roll No'/>
        <label htmlFor="password">Password :</label>
        <input value={password} onChange={e=>{setPassword(e.target.value)}} className='inp' type="text" id='password' placeholder='Password'/>
        <input type="submit" className='btns' />
        <div className='d-flex'>
        <p>Not a registered User ?</p>
        <Link to="/signup">Sign Up</Link>
        </div>        
      </form>
      </div>
    </div>
    </>

   
  )
}
