import React, { useState } from 'react';
import { apiURL } from '../constants/constants';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { MDBInput } from "mdbreact";
import axios from 'axios';

function Login () {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const login = () => {
    axios.post(`${apiURL}login`, 
      { username: username, password: password })
         .then((res) => {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            history.push('/');
          })
        .catch((err) => {
           setErrors(err.response.data.errors);
        });
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login">
        <h1 align="center">Login</h1>
        { errors && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error:</strong> {errors}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="login-form">
          <MDBInput 
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)} 
          />
          <MDBInput
            label="Password(min. 8 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-center">
            <Button variant="succes" onClick={login}>Login</Button>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default Login;