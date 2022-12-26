import {
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  LOG_OUT,
} from './constant';

const initialState = {
  isAuthenticating: false,
  authenticated: false,
  error: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticating: true,
      };
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        authenticated: true,
      };
    case AUTHENTICATE_FAIL:
      return {
        ...state,
        isAuthenticating: false,
        authenticated: false,
        error: payload,
      };
    case LOG_OUT:
      return {
        ...state,
        authenticated: false,
        error: '',
      };
    default:
      return state;
  }
};
