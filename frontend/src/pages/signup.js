import React, { useState } from 'react'
import axios from '../axios';
import { Navigate } from 'react-router-dom';
import ErrorItem from '../components/error';

function Signup() {
  const [formData, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword, username } = formData;
  const [error, setErr] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); 


  const onChange = evt => setForm({ ...formData, [evt.target.name]: evt.target.value });

  const onSubmit = async evt => {
    evt.preventDefault();
    if(password !== confirmPassword) {
      setErr(<ErrorItem errData={ {message: 'Passwords dont match!'} }/>)
      return;
    }
    axios.post('/auth/signup', JSON.stringify(formData))
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
              <label htmlFor="username"></label>
              <input type="text" id='username' className="form-control" name="username"  placeholder="Username" onChange={e => onChange(e)} value={username}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email"></label>
              <input type="email" id='email' className="form-control" name="email"  placeholder="Email" onChange={e => onChange(e)} value={email}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password"></label>
              <input type="password" id='password' className="form-control" name="password"  placeholder="Password" onChange={e => onChange(e)} value={password}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword"></label>
              <input type="password" id='confirmPassword' className="form-control" name="confirmPassword"  placeholder="Confirm Password" onChange={e => onChange(e)} value={confirmPassword}/>
            </div>
            <button type='submit' className='btn btn-primary'>Login</button>
        </form>
    </div>
  )
}

export default Signup