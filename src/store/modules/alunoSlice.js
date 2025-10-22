import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/axios';

export const fetchAluno = createAsyncThunk('aluno/fetchAluno', async (id) => {
  const res = await api.get(`/alunos/${id}`);
  return res.data;
});

const alunoSlice = createSlice({
  name: 'aluno',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAluno.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAluno.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAluno.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default alunoSlice.reducer;
