import React from 'react';
import Container from '@mui/material/Container';
import LoginForm from '../components/LoginForm/LoginForm';

// login page component
const Login = () => {

  return(
    <Container maxWidth='md'>
      <LoginForm />
    </Container>  
  )
}

export default Login;