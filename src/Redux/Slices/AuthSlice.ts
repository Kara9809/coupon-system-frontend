import { createSlice } from '@reduxjs/toolkit';
import { LoginResponceModel } from '../../Models/LoginResponceModel';

export interface AuthState {
  user: LoginResponceModel;
}


const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : { id: 0, token: "", email: "", name: "", clientType: "" }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(state, action) {
      try {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error storing user in localStorage:', error);
      }
    },

    // {...action.payload} is like this: { id: 0, token: "", email: "", name: "", clientType: "" }
    // action.payload is like this: LoginResponceModel

    logoutAction(state) {
      localStorage.removeItem('user');
      state.user = { id: 0, token: "", email: "", name: "", clientType: "" };
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;