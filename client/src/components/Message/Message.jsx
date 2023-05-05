import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

import '../../styles/message.scss';

//component which display user message
const Message = props => {

  const { name, text, userId } = props.data;
  const { userID } = useSelector(state => state);

  return(
    <div className={`messageRow ${ userId === userID ? 'messageRow--myself' : null}`}>
      <Avatar>
        {name.substring(0,1)}
      </Avatar>
      <div className='messageBody'>
          <Typography className='messageName' variant='caption' gutterBottom>
            {name}
          </Typography>
          <Typography className='messageText' variant='body2' gutterBottom>
            {text}
          </Typography>
      </div>
    </div>
  )
}

export default Message;