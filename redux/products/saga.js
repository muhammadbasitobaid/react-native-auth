import {takeEvery, call, put} from 'redux-saga/effects';
import {getMyStringValue} from '../api/tokenHandling';
import {FETCH_PRODUCTS} from './constants';

function* getProducts({payload}) {
  try {
    const tokenS = yield getMyStringValue();
  } catch (error) {
    const errorMessage = yield error.message ===
    'Request failed with status code 401'
      ? 'User Not Found'
      : error.message;
    // yield put(authenticateFail(errorMessage));
  }
}

export default function* watchGetProducts() {
  yield takeEvery(FETCH_PRODUCTS, getProducts);
}
