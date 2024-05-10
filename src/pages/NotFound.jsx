import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <h1>ystaa L link m4 tmam</h1>
      <button onClick={() => navigate("/")}>
        Go To Home?
      </button>
    </>
  )
}

export default NotFound