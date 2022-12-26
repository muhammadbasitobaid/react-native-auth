import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
// import watchFetchToken from './redux/auth/saga';
import rootSaga from './redux/rootSaga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middleware = [sagaMiddleware, logger];
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
