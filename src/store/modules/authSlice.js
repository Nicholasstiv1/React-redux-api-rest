import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/tokens', { email, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ nome, password, email, id }, thunkAPI) => {
    try {
      let response;

      if (id) {
        const updateData = {};
        if (nome) updateData.nome = nome;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        response = await axios.put('/users', updateData);

        toast.success('Dados atualizados com sucesso');
        return response.data;
      } else {
        response = await axios.post('/users', {
          nome,
          password,
          email,
        });

        toast.success('Cadastro concluído com sucesso');
        return response.data;
      }
    } catch (error) {
      const errors = error?.response?.data?.errors ?? [];
      errors.forEach((e) => toast.error(e));
      return thunkAPI.rejectWithValue(errors);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    test: (state, action) => {
      console.log(action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = false;
      state.user = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...initialState,
          error: action.payload,
        };
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { test, logout } = authSlice.actions;
export default authSlice.reducer;
