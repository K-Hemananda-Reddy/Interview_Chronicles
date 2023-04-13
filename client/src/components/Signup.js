import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import "../static/Signup.css"
import "../static/utils.css"
import  image from "../static/img/signupbg.jpg"


export const Signup = () => {
    const [username,setUsername]=useState('');
    const [rollno,setRollno]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [validate,setValidate]=useState('');
    const Navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(password.length<8){
          setValidate('Password should contain atleast 8 characters');
          return;
        }
        // if(!email.match("^[a-zA-Z0-9]*@cbit\.org\.in$")){
        //   setValidate("Enter correct email");
        //   return;
        // }

        const response=await fetch("/register",{
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({
            rollno,
            username,
            email,
            password
          })
        })

        const json=await response.json();
        
        
         
          if(json.success){
            localStorage.setItem('token',json.authtoken)
           Navigate('/home');
            console.log("Account created successfully","success")
          }
          else{
            alert("Failed")
          }

       
    }
  return (
    <>
    <img className=""src={image} alt="" />
    <div className='cont mt-5 d-flex flex-column bg_col justify-content-center container border p-3 border-2'>
      <h1 className='text-center'>Sign Up</h1>
      <div className="container con">
      <form onSubmit={handleSubmit} className='formFlex'>
        <label htmlFor="name">User Name :</label>
        <input value={username} onChange={e=>{setUsername(e.target.value)}} type="text" id='name'  className="inp" placeholder='Enter your name' />
        <label htmlFor="rollno">Roll No :</label>
        <input value={rollno} onChange={e=>{setRollno(e.target.value)}} type="text" id='rollno' className="inp" placeholder='Enter Your Roll No'/>
        <label htmlFor="email">Email :</label>
        <input value={email} onChange={e=>{setEmail(e.target.value)}} type="text" id='email' className="inp" placeholder='Enter Your Email'/>
        <label htmlFor="password">Password :</label>
        <input value={password} onChange={e=>{setPassword(e.target.value)}} type="password" className="inp" id='password' placeholder='Password'/>
        {validate !== ''&&<div>{validate}</div>}
        <input  type="submit" className='btns' />
        
      </form>
      <p>Already Have an Account ? <Link to='/login'>Login</Link></p>
      </div>
    </div>
    </>
  )
}
