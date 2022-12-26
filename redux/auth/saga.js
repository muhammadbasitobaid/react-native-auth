import {takeEvery, call, put} from 'redux-saga/effects';
import {postCredentials} from '../api/api';
import {retrieveUserSession, storeUserSession} from '../api/tokenHandling';
import {authenticateFail, authenticateSuccess} from './actions';
import {AUTHENTICATE} from './constant';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setStringValue} from '../api/tokenHandling';
import {getMyStringValue} from '../api/tokenHandling';

function* fetchToken({payload}) {
  try {
    const response = yield call(postCredentials, payload);
    const token = response.data.access_token;
    yield setStringValue(token);
    const tokenS = yield getMyStringValue();

    yield put(authenticateSuccess());
  } catch (error) {
    yield put(authenticateFail(error.response.data.message));
  }
}

export default function* watchFetchToken() {
  yield takeEvery(AUTHENTICATE, fetchToken);
}
