import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './modules/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
