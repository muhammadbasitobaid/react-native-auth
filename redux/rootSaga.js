import {put, takeEvery, all} from 'redux-saga/effects';
import watchFetchToken from './auth/saga';
import watchGetProducts from './products/saga';

export default function* rootSaga() {
  yield all([watchFetchToken(), watchGetProducts()]);
}
