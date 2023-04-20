/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import "../static/PostPayload.css"
import user_pic from "../static/img/user.jpg"
import { Comment } from './Comment'
import { ViewComment } from './ViewComment'

export const PostPayload = (props) => {
  let { postid } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [tags, setTags] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [rollno, setRollno] = useState('');
  const Navigate = useNavigate();
  const [comments,setComments]=useState([]);
  const getPost = async () => {

    if (!localStorage.getItem('token')) {
      Navigate('/login');
      return;
    }



    const response = await fetch(`/post/${postid}`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    })

    

    
    const json = await response.json();
    setTitle(json.title);
    setContent(parse(json.content));
    setRollno(json.rollno);
    setCreatedAt(json.createdAt);
    setTags(json.tags);
    setUsername(json.username);
  }

  const getComments=async()=>{
    const response2 = await fetch(`/getComments`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        postid,
      }),
    })
    const json2=await response2.json();
    setComments(json2)
  }

  useEffect(() => {
    getPost();
  }, [])
  useEffect(()=>{
    getComments();
  },[comments])
  return (
    <>
    <div className='p-vessel'>
      <div className='vessel'>
        <div className='row-1'>
          <Link className='row-1a' to="/home">back</Link>
          <h2 className='row-1b'>{title}</h2>
        </div>
        <div className='row-2'>
          <div className='row-2a'>
            <img src={user_pic} alt="user"></img>
            <p>{username} <Link style={{"padding" : "1px 7px 1px 1px"}} to={`/home/user/${rollno}`}>{rollno}</Link> at {createdAt} </p>
          </div>
          <div className='row-2c'>
            <span className='desc'>Description</span>
            <div className='content-box'>
              <p>{content}</p>
            </div>
          </div>
          <div className='row-2b'>
            <p className='tags'>#{tags}</p>
          </div>
          <Comment postid={postid}/>
        </div>
      </div>
    </div>
    {comments.map((doc) => {
            return (
              <ViewComment
                username={doc.username}
                content={doc.comment}
              />
            );
          })}
    </>


  )
}
