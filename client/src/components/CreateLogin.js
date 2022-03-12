import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';
import { ThemeContext } from '../contexts/ThemeContext';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function CreateLogin() {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [confirmMsg, setConfirmMsg] = useState('')
const [confirmed, setConfirmed] = useState(false);
const [screenname, setScreenname] = useState('')
const theme = useContext(ThemeContext);

const registration = {
  username: username,
  password: password
}

async function addNewUser() {
  const response = await axios.post(`/api/register`, registration) 
  return response
}

function handleSubmit(event) {
  event.preventDefault() 
  setConfirmMsg('')
  if (username !== "" && password !== "" ) {
    addNewUser()
    .then(response => {
      console.log(response.data)
      setScreenname(response.data)
      setConfirmed(true)
    })
  } else {
    setConfirmMsg('Oops - please enter a username and password to register!')
  }
   
}

useEffect(()=> {
  if(confirmed) {
    setConfirmMsg(`Welcome, ${screenname}!  You may now log in.`)
  }
},[confirmed])

  return <div className="container_createlogin">

  <Link to="/"
    className= "nav_link--createlogin"
    >  ← Back
  </Link >
  
  <Form
    className='createlogin_form'
  >
    <Form.Group className="createlogin_username" controlId="formBasicUsername">
      <Form.Label>Login Username (this will also be your screenname)</Form.Label>
      <Form.Control
        type="text"
        placeholder="login username"
        onChange={event=>setUsername(event.target.value)}
        value={username}
      />
    </Form.Group>

    <Form.Group className="createlogin_password" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="password"
        onChange={event=>setPassword(event.target.value)}
        value={password}
      />
    </Form.Group>
    <Button
      className="createlogin_button" 
      type="submit"
      variant="secondary"
      onSubmit={handleSubmit}
    >Register</Button>
    
  </Form>  

    {confirmed ? confirmMsg : ''}
      <Link to="/"
            className= "nav_link">
                Log In
      </Link>
  </div>;
}
