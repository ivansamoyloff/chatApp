import React from 'react';
import Container from '@mui/material/Container';
import TypingComponent from '../components/TypingComponent/TypingComponent';
import MessageInput from '../components/MessageInput/MessageInput';
import MessageContainer from '../components/MessageContainer/MessageContainer';

import '../styles/chatContainer.scss'

// chat page component
const Chat = () => {

  return(
    <Container className='chatContainer' maxWidth='md' sx={{display: 'flex'}}>
      <MessageContainer />
      <TypingComponent />
      <MessageInput />
    </Container>  
  )
}

export default Chat;