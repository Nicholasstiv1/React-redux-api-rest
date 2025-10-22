import { combineReducers } from '@reduxjs/toolkit';
import testReducer from './modules/testSlice';
import alunoReducer from './modules/alunoSlice';

const rootReducer = combineReducers({
  test: testReducer,
  aluno: alunoReducer,
});

export default rootReducer;
