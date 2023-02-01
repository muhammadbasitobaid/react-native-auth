import {
  ADD_TASK,
  DISABLE_NEW_TASK_MODAL,
  DISABLE_UPDATE_TASK_MODAL,
  ENABLE_NEW_TASK_MODAL,
  ENABLE_UPDATE_TASK_MODAL,
  FETCH_TASKS,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_SUCCESS,
  DELETE_TASK,
  UPDATE_TASK,
} from './constants';

export const fetchTasks = currentPage => ({
  type: FETCH_TASKS,
  currentPage,
});

export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFail = error => ({
  type: FETCH_TASKS_FAIL,
  payload: error,
});
export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};
export const updateTasks = updatedTasks => {
  return {
    type: UPDATE_TASK,
    payload: updatedTasks,
  };
};

export const deleteTask = task => {
  return {
    type: DELETE_TASK,
    payload: task,
  };
};

export const enableNewTaskModal = () => {
  return {
    type: ENABLE_NEW_TASK_MODAL,
  };
};
export const disableNewTaskModal = () => {
  return {
    type: DISABLE_NEW_TASK_MODAL,
  };
};
export const enableUpdateTaskModal = id => {
  return {
    type: ENABLE_UPDATE_TASK_MODAL,
    payload: id,
  };
};
export const disableUpdateTaskModal = () => {
  return {
    type: DISABLE_UPDATE_TASK_MODAL,
  };
};
