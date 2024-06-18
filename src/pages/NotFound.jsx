import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReactCard from './ExCard'; // Assuming the component is in a separate file


const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div className='not-found'>
      <h1>wrong link...</h1>
      <button onClick={() => navigate("/")}>
        Go To Home?        
      </button>
    </div>
  )
}

export default NotFound