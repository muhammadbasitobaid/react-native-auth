import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import uuid from 'react-uuid';
import {getMyStringValue} from './tokenHandling';

axios.interceptors.request.use(
  config => {
    var time = new Date();
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}`,
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const postCredentials = ({email, password, requestType}) => {
  // const url = requestType
  //   ? 'https://react-native-crud-todo.cyclic.app/auth/register'
  //   : 'https://react-native-crud-todo.cyclic.app/auth/login';

  const url = 'http://10.0.2.2:8000/auth/login';
  return axios({
    method: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify({email, password}),
    url,
  });
};

export const getTodos = async currentPage => {
  const token = await AsyncStorage.getItem('@token');

  return axios.get('http://10.0.2.2:8000/todos', {
    params: {
      _page: currentPage,
      _limit: 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = async newTask => {
  const task = {
    id: uuid(),
    ...newTask,
  };
  const token = await AsyncStorage.getItem('@token');
  console.log(`axois posting newTask`, task);
  return axios.post('http://10.0.2.2:8000/todos', task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateT = async updatedTask => {
  console.log('updatedTask', updatedTask);
  const token = await AsyncStorage.getItem('@token');

  return axios.put(
    `http://10.0.2.2:8000/todos/${updatedTask.id}`,
    updatedTask,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteT = async id => {
  const token = await AsyncStorage.getItem('@token');
  console.log(`api line num 105`);

  return axios.delete(`http://10.0.2.2:8000/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
