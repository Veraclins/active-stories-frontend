import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'state/interfaces';
import { persistLogin, getAuth, clearAuth } from 'helpers/auth';

type CurrentStoryState = {
  authenticated: boolean;
  user: User | null;
};

const initialState: CurrentAuthState = getAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.authenticated = true;
      persistLogin(state.authenticated, state.user);
    },
    logout(state) {
      state.user = null;
      state.authenticated = false;
      clearAuth();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
