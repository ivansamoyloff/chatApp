import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { socket } from '../../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { setFocused, setMessage, setSend } from '../../utils/action';

import '../../styles/messageInput.scss';

// component which handle user message, send it to server,
// include 'companion typing' logic
const MessageInput = () => {

  const { name, userID, message, send, focused } = useSelector(state => state);
  const dispatch = useDispatch();

  // handle send button
  const handleSend = () => {
    dispatch(setSend(true));
  }

  // effect which send message to server and send information about
  // somebody typing
  useEffect(() => {
    if(send){
    socket.emit('sendMessage', {userId: userID, name: name, text: message});
     dispatch(setSend(false));
     dispatch(setMessage(''));
    }

    if(focused && message.length > 0){
      socket.emit('setTypingMessage', {userId: userID, name: name});
    }else if(!focused || (focused && message.length === 0)){
      socket.emit('unsetTypingMessage', {userId: userID, name: name});
    }
    
   }, [send, message, name, userID, focused, dispatch])

  return(
    <div className='messageInput'>
      <TextField
          id="msg-input"
          placeholder='Type your message here...'
          value={message}
          onChange={e => dispatch(setMessage(e.target.value))}
          onFocus={() => dispatch(setFocused(true))}
          onBlur={() => dispatch(setFocused(false))}
          multiline
          fullWidth
          maxRows={4}
        />
      <Button 
        onClick={() => handleSend()} 
        variant="contained"
        disabled={message.length === 0} 
        endIcon={<SendIcon />}>
          Send
      </Button>
    </div>
  )
}

export default MessageInput;