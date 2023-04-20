import React, { useState } from 'react'
import { useRef } from 'react'
export const Comment = (props) => {
    const [comment,setComment]=useState('');
    
    const ref=useRef(null);
    const refClose = useRef(null)
    const handleClick=(e)=>{
        e.preventDefault();
        ref.current.click()
    }
    const handleClose=async(e)=>{
        e.preventDefault()
        const response2=await fetch('/getuser',{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')  
            },

        })
        const json2=await response2.json();
        const username=json2.username;

        const response=await fetch(`/createComment`,{
            method:'POST',
            headers:{
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')  
            },
            body:JSON.stringify({postid:props.postid,username,comment})
          })
          setComment('');
        refClose.current.click();
    }
  return (
   
    <>
  
<button ref={ref} type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>
<button onClick={handleClick} className='btn btn-primary'>Add Comment</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Comment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
            {/* <label for="message-text" class="col-form-label">Message:</label> */}
            <textarea value={comment} onChange={(e)=>{setComment(e.target.value)}} class="form-control" id="message-text"></textarea>
          </div>
      </div>
      <div class="modal-footer">
        <button ref={refClose} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  onClick={handleClose} type="button" class="btn btn-primary"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
