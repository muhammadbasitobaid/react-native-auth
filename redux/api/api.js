import axios from 'axios';

export const postCredentials = ({email, password, requestType}) => {
  const url = requestType
    ? 'https://react-native-crud-todo.cyclic.app/auth/register'
    : 'https://react-native-crud-todo.cyclic.app/auth/login';
  return axios({
    method: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify({email, password}),
    url: url,
  });
};
