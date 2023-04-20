import React from 'react'

export const ViewComment = (props) => {
  return (
    <div class="card w-75 mx-auto">
    <div class="card-body">
      <p className='fw-bold'>{props.username}</p>
      <p> {props.content}</p>
    </div>
  </div>
  )
}
