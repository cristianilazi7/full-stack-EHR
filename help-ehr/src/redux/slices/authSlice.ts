import  { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface user {
    id: string;
    email: string;
    role: string
}

interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    user: user | null;
}

const initialState: AuthState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<{ token: string, user: user }>) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
    resetAuthError(state) {
      state.error = null;
    },
  },
});


export const {
    authStart,
    authSuccess,
    authFailure,
    logout,
    resetAuthError,
  } = authSlice.actions;
  
  export default authSlice.reducer;