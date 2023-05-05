import React, { useEffect } from 'react';
import Message from '../Message/Message';
import { socket } from '../../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../../utils/action';

import '../../styles/messageContainer.scss';

//component which combine all users messages in the room
const MessageContainer = () => {

  const { messages } = useSelector(state => state);
  const dispatch = useDispatch();

  // effect listen new messages from server via websocket
  useEffect(() => {
    socket.on('addMessage', data => dispatch(setMessages(data)));
    
    return () => socket.off('addMessage');
   }, [dispatch])

  const msgArr = messages.map((item, index) => <Message key={index} data={item} />)

  return(
      <div className='messageContainer'>
        {msgArr}
      </div>
  )
}

export default MessageContainer;