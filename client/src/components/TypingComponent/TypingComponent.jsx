import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../utils/socket';
import { setTyping } from '../../utils/action';

// component which display 'your companion typing' message
const TypingComponent = () => {

  const { typing, userID } = useSelector(state => state);
  const who = typing.filter(item => item.userId !== userID).map(item => item.name);
  const dispatch = useDispatch();

  const [text, setText] = useState(`${who.map(item => ` ${item}`)} typing`)
  const [index, setIndex] = useState(0);
  const fullText = " ... ";

  // effect which create 'typing effect'
  useEffect(() => {
    let timeout;
    if (who.length !== 0){
      if (index < fullText.length) {
        timeout = setTimeout(() => {
          setText(text + fullText[index])
          setIndex(index + 1)
        }, 120)
      } else {
        setText(`${who.map(item => ` ${item}`)} typing`)
        setIndex(0)
        clearTimeout(timeout)
      }
    }
  }, [who, index, fullText, text])

  // effect which send typing status to server
  useEffect(() => {
    socket.on('messageTyping', data => {dispatch(setTyping(data));});
    
    return () => socket.off('messageTyping');
  }, [dispatch])

  return(
    <div>
      <Typography 
      display={who.length !== 0 ? 'block' : 'none'} 
      variant='subtitle2'
      sx={{color:'#444'}}
      gutterBottom
      >
        {text} 
      </Typography>
    </div>
  )
}

export default TypingComponent;