import {takeEvery, call, put} from 'redux-saga/effects';
import {postCredentials} from '../api/api';
import {retrieveUserSession, storeUserSession} from '../api/tokenHandling';
import {authenticateFail, authenticateSuccess} from './actions';
import {AUTHENTICATE} from './constant';
import EncryptedStorage from 'react-native-encrypted-storage';
import {setStringValue} from '../api/tokenHandling';
import {getMyStringValue} from '../api/tokenHandling';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* fetchToken({payload}) {
  try {
    const response = yield call(postCredentials, payload);
    const token = response.data.access_token;
    console.log(`token in saga ----> ${token}`);

    yield setStringValue(token);
    yield AsyncStorage.setItem('@token', token);

    yield put(authenticateSuccess());
  } catch (error) {
    yield put(authenticateFail(error.response.data.message));
  }
}

export default function* watchFetchToken() {
  yield takeEvery(AUTHENTICATE, fetchToken);
}
