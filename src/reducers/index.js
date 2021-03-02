import {combineReducers} from 'redux';
import formReducer from './formReducer';
import taskReducer from './taskReducer';

export const rootReducer = combineReducers({formReducer, taskReducer});