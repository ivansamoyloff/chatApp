import * as TYPES from './types';

export function setName(payload){
  return dispatch => dispatch({ type: TYPES.SET_NAME, payload });
}

export function setUserId(payload){
  return dispatch => dispatch({ type: TYPES.SET_USERID, payload });
}

export function setError(payload){
  return dispatch => dispatch({ type: TYPES.SET_ERROR, payload });
}

export function setSend(payload){
  return dispatch => dispatch({ type: TYPES.SET_SEND, payload });
}

export function setFocused(payload){
  return dispatch => dispatch({ type: TYPES.SET_FOCUSED, payload });
}

export function setTyping(payload){
  return dispatch => dispatch({ type: TYPES.SET_TYPING, payload });
}

export function setMessage(payload){
  return dispatch => dispatch({ type: TYPES.SET_MESSAGE, payload });
}

export function setMessages(payload){
  return dispatch => dispatch({ type: TYPES.SET_MESSAGES, payload });
}
