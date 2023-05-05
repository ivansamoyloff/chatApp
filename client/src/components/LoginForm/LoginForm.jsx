import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { socket } from '../../utils/socket';
import getUuid from 'uuid-by-string';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setName, setUserId, setError, setSend, setFocused } from '../../utils/action';

// this component set username, userId and send it to server 
const LoginForm = () => {

  const { name, userID, err, focused, send } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // method sending username, userId to server via websocket
  const sendUser = useCallback(() => {
    dispatch(setUserId(getUuid(name+new Date().toISOString())))
    socket.emit('setUser', {name: name, id: userID});
  }, [name, userID, dispatch]);

  // method handle login button click
  const handleClick = () => {
    dispatch(setError(name.length < 1));
    dispatch(setSend(true));
  }

  // effect set error if username input blank
  useEffect(() => {
    dispatch(setError(name.length < 1 && focused))
  }, [name, focused, dispatch]);

  // effect sending username, userId to server via websocket if username
  // not blank
  useEffect(() => {
   if(send && !err){
    sendUser();
    dispatch(setSend(false));
    dispatch(setFocused(false));
    navigate('/chat');
   } 
   return () => socket.off('setUser');
  }, [
    send, 
    err,
    navigate, 
    sendUser, 
    dispatch
  ]);

  return(
        <Box sx={{
            height: '80vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
          <Typography variant='h3' gutterBottom>
            Welcome to new web chat
          </Typography>
          <TextField
            error={err}
            id="login"
            value={name}
            onChange={e => dispatch(setName(e.target.value))}
            onClick={() => dispatch(setFocused(true))}
            placeholder='Type your nickname here'
          />
           <Typography 
            sx={{color:'#d32f2f', opacity:`${err ? 1 : 0}`}} 
            variant='subtitle1' 
            gutterBottom>
            Please enter your nickname
          </Typography>
          <Button variant="contained" disabled={err} onClick={() => handleClick()}>Start Chat</Button>
        </Box> 
  )
}

export default LoginForm;