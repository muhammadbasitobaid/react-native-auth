import {all} from 'redux-saga/effects';
import watchFetchToken from './auth/saga';
import watchGetProducts from './products/saga';
import {
  watchGetTasks,
  watchAddTask,
  watchDeleteTask,
  watchUpdateTask,
} from './saga';

export default function* rootSaga() {
  yield all([
    watchFetchToken(),
    watchGetProducts(),
    watchGetTasks(),
    watchAddTask(),
    watchUpdateTask(),
    watchDeleteTask(),
  ]);
}
