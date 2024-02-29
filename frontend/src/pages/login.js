import React, { useState } from 'react'
import axios from '../axios';
import { Link, Navigate } from 'react-router-dom';
import ErrorItem from '../components/error';

function Login() {
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const [error, setErr] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); 


  const onChange = evt => setForm({ ...formData, [evt.target.name]: evt.target.value });

  const onSubmit = async evt => {
    evt.preventDefault();
    axios.post('/auth/login', JSON.stringify(formData))
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthenticated(true);
      setErr(null);
    }).catch(err => {
      setErr(<ErrorItem errData={err}/>);
    })
  }

  if(authenticated) {
    return <Navigate to='/tasks'/>
  }

  return (
    <div>
        <h2>Login</h2>
        {error}
        <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email"></label>
              <input type="email" id='email' className="form-control" name="email" aria-describedby="emailHelpId" placeholder="Email" onChange={e => onChange(e)} value={email}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password"></label>
              <input type="password" id='password' className="form-control" name="password" aria-describedby="emailHelpId" placeholder="Password" onChange={e => onChange(e)} value={password}/>
            </div>
            <button type='submit' className='btn btn-primary'>Login</button>
            <small>
              Dont have an account ? <Link to='/signup'>signup now</Link>
            </small>
        </form>
    </div>
  )
}

export default Login