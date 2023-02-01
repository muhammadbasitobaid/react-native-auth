import {
  ADD_TASK,
  ADD_TASK_FAIL,
  ADD_TASK_SUCCESS,
  DELETE_TASK,
  DISABLE_NEW_TASK_MODAL,
  DISABLE_UPDATE_TASK_MODAL,
  ENABLE_NEW_TASK_MODAL,
  ENABLE_UPDATE_TASK_MODAL,
  FETCH_TASKS,
  FETCH_TASKS_END_LIST,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
} from './constants';

const initialState = {
  isLoading: false,

  tasks: [],
  error: '',
  isNewTaskModalEnable: false,
  isUpdateTaskModalEnable: false,
  idToBeUpdate: null,
  isMoreLoading: false,
  isListEnd: false,
};

export default (state = initialState, {type, payload, currentPage}) => {
  switch (type) {
    case FETCH_TASKS:
      if (currentPage === 1) {
        return {
          ...state,
          isLoading: true,
        };
      } else {
        return {
          ...state,
          isMoreLoading: true,
        };
      }
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isMoreLoading: false,
        tasks: [...state.tasks, ...payload],
        error: '',
      };
    case FETCH_TASKS_FAIL:
      return {
        ...state,
        isLoading: false,
        isMoreLoading: false,
        error: payload,
      };
    case FETCH_TASKS_END_LIST:
      return {
        ...state,
        isLoading: false,
        isMoreLoading: false,
        isListEnd: true,
      };
    case ADD_TASK:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_TASK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: '',
      };

    case DELETE_TASK:
      return state;

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
