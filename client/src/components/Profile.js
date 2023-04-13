/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from './Post';
import "../static/Profile.css"
import userpic from "../static/img/user.jpg"

export const Profile = (props) => {

  const [user, setUser] = useState('');
  // const [rollno,setRollno]=useState('');
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();
  let { rollno } = useParams();
  const getuser = async () => {
    if (!localStorage.getItem('token')) {
      Navigate('/login');
      return;
    }
    const response = await fetch(`/user/${rollno}`, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    })
    const json = await response.json();
    setUser(json.user.username)
    setEmail(json.user.email);

    setPosts(json.posts);


    // setRollno(json.user.rollno);
  }

  useEffect(() => {
    getuser();
  }, [])

  useEffect(() => {
    getuser();
  }, [posts])
  return (
    <>
      <div className='main-cont'>
        <div className='main-cont-sub'>
          <div className='cont-left'>
            <img src={userpic} alt="user"></img>
          </div>

          <div className='cont-right'>
            <div className='d-flex align-items-center'>
              <h5>Name : </h5>
              <div className='m-3'>{user}</div>
            </div>
            <div className='d-flex align-items-center'>
              <h5>RollNo : </h5>
              <div className='m-3'>{rollno}</div>
            </div>
            <div className='d-flex align-items-center'>
              <h5>Email Address :</h5>
              <div className='m-3'>{email}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-dark text-white p-2 text-center'>
        <h5 className='posts'>POSTS</h5>
      </div>

      <div className='postsList'>
      {posts.map((post) => {
        return <Post key={post._id} id={post._id} title={post.title.slice(0, 20)} content={post.content.slice(0, 33)} />
      })}
      </div>
    </>
  )
}
