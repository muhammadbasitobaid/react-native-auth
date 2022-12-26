import {
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  AUTHENTICATE_SUCCESS,
  LOG_OUT,
} from './constant';

export const authenticate = credentials => {
  return {
    type: AUTHENTICATE,
    payload: credentials,
  };
};
export const authenticateSuccess = () => {
  return {
    type: AUTHENTICATE_SUCCESS,
  };
};
export const authenticateFail = error => {
  return {
    type: AUTHENTICATE_FAIL,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};
