import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class='py-5'>
        <h1>Todo List</h1>
    <p className="lead">Signup & create your Tasks list rightaway</p>
    
    <p className="lead">
      <Link className='btn btn-light text-uppercase' to="/signup">Create Account</Link>
    </p>
    </div>
  )
}

export default Home