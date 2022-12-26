import {
  ADD_TASK,
  DISABLE_NEW_TASK_MODAL,
  DISABLE_UPDATE_TASK_MODAL,
  ENABLE_NEW_TASK_MODAL,
  ENABLE_UPDATE_TASK_MODAL,
  UPDATE_TASK,
} from './constants';
import uuid from 'react-uuid';

const initialState = {
  isLoading: false,
  tasks: [
    {id: uuid(), title: 'Pray Fajr', isDone: true},
    {id: uuid(), title: 'Pray Zuhar', isDone: false},
    {id: uuid(), title: 'Pray Asar', isDone: true},
    {id: uuid(), title: 'Pray Maghrib', isDone: false},
    {id: uuid(), title: 'Pray Isha', isDone: true},
  ],
  error: '',
  isNewTaskModalEnable: false,
  isUpdateTaskModalEnable: false,
  idToBeUpdate: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuid(),
            title: payload.title,
            isDone: payload.isDone,
          },
        ],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: payload,
      };

    case ENABLE_NEW_TASK_MODAL:
      return {
        ...state,
        isNewTaskModalEnable: true,
      };
    case DISABLE_NEW_TASK_MODAL:
      return {
        ...state,
        isNewTaskModalEnable: false,
      };
    case ENABLE_UPDATE_TASK_MODAL:
      return {
        ...state,
        isUpdateTaskModalEnable: true,
        idToBeUpdate: payload,
      };
    case DISABLE_UPDATE_TASK_MODAL:
      return {
        ...state,
        isUpdateTaskModalEnable: false,
      };

    default:
      return state;
  }
};
