import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../static/Navbar.css"
import "../static/utils.css"


export const Navbar = () => {
  const [user, setUser] = useState('');
  const [rollno, setRollno] = useState('');
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/home/createpost');
  }

  const redi = () =>{
    Navigate(`/home/user/${rollno}`)
  }

  const getuser = async () => {
    const response = await fetch("/getuser", {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    })
    const json = await response.json();
    setUser(json.username)
    setRollno(json.rollno)
  }
  useEffect(() => {
    getuser();
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('token')
    Navigate("/login")
  }
  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <Link class="navbar-brand title" to="/home">Interview Chronicles</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse  coll" id="navbarSupportedContent">
          <button onClick={handleClick} className='crtpost btn btn-primary'>Create Post</button>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active username" aria-current="page" to={`/home/user/${rollno}`}>{user}</Link>
            </li>
          </ul>
          <i onClick={handleLogout} class="logout fas fa-sign-out-alt mx-2" style={{ "color": "#ffffff" }}></i>
        </div>
      </div>
    </nav>
  )
}
