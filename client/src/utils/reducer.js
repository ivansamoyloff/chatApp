import * as TYPES from './types';

const initialState = {
  name: '',
  userID: '',
  err: false,
  send: false,
  focused: false,
  typing: [],
  message: '', 
  messages: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case TYPES.SET_USERID:
      return {
        ...state,
        userID: payload,
      };
    case TYPES.SET_TYPING:
      return {
        ...state,
        typing: payload,
      };
    case TYPES.SET_ERROR:
      return {
        ...state,
        err: payload,
      };
    case TYPES.SET_SEND:
      return {
        ...state,
        send: payload,
      };
    case TYPES.SET_FOCUSED:
      return {
        ...state,
        focused: payload,
      };
    case TYPES.SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case TYPES.SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    default:
      return { ...state };
  }
}
