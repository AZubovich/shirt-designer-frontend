import React, { useState } from 'react';
import { apiURL } from '../constants/constants';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import { MDBInput } from "mdbreact";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function SignUp () {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const currentUser = localStorage.getItem('currentUser');

  const renderErrors = () => {
    if (errors === null) return null;
    return Object.entries(errors).map(([k, v]) => (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" key={`${k} ${v}`}>
        <strong>Error:</strong> {k} {''} {v}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
       </div>
    ));
  };

  const signUp = () => {
    axios.post(`${apiURL}users`, 
      { username: username, password: password })
       .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        axios.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        history.push('/');
       })
       .catch((err) => {
          setErrors(err.response.data.errors);
       });
  };

  return (
    <div className="sigUp-page">
      <Header />
      <div className="signUp">
        <h1 align="center">Sign Up</h1>
        {renderErrors()}
        <div className="signUp-form">
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
            <Button variant="succes" onClick={signUp}>Sign Up</Button>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default SignUp;