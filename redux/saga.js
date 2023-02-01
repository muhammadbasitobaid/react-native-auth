import {takeEvery, call, put, putResolve} from 'redux-saga/effects';
import {fetchTasksFail, fetchTasks, fetchTasksSuccess} from './actions';
import {createTask, deleteT, getTodos, updateT} from '../api/api';
import {
  FETCH_TASKS,
  ADD_TASK,
  ADD_TASK_FAIL,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_TASKS_END_LIST,
} from './constants';

function* getTask({currentPage}) {
  try {
    const response = yield call(getTodos, currentPage);
    const tasks = yield response.data;
    yield put(fetchTasksSuccess(tasks));
    if (tasks.length < 10) {FETCH_TASKS
      yield put({type: FETCH_TASKS_END_LIST});
    }
  } catch (error) {
    console.log(error);
    yield put(fetchTasksFail(error.message));
  }
}
export function* watchGetTasks() {
  yield takeEvery(FETCH_TASKS, getTask);
}FETCH_TASKS

function* addTask({payload}) {
  try {
    const response = yield call(createTask, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddTask() {
  yield takeEvery(ADD_TASK, addTask);
}

function* updateTask({payload}) {
  try {
    yield call(updateT, payload);
  } catch (error) {}
}

export function* watchUpdateTask() {
  yield takeEvery(UPDATE_TASK, updateTask);
}

function* deleteTask({payload}) {
  try {
    yield call(deleteT, payload.id);
  } catch (error) {
    console.log(error);
  }
}FETCH_TASKS

export function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK, deleteTask);
}
FETCH_TASKSFETCH_TASKSFETCH_TASKSFETCH_TASKS