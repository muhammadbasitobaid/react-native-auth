import {combineReducers} from 'redux';
import taskReducer from './redux/reducer';
import authReducer from './redux/auth/reducer';
const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
});
export default rootReducer;
