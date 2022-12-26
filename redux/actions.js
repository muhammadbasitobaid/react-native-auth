import {
  ADD_TASK,
  DISABLE_NEW_TASK_MODAL,
  DISABLE_UPDATE_TASK_MODAL,
  ENABLE_NEW_TASK_MODAL,
  ENABLE_UPDATE_TASK_MODAL,
  UPDATE_TASK,
} from './constants';

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
