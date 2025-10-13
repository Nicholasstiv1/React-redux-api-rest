import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: { name: '', loggedIn: false, estadoBotao: false },
  reducers: {
    noop: (state) => state,
    alterName: (state, action) => {
      state.name = action.payload;
    },
    botaoClicado: (state) => {
      state.estadoBotao = !state.estadoBotao;
    },
  },
});

export const { noop, alterName, botaoClicado } = testSlice.actions;
export default testSlice.reducer;
