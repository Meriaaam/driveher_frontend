import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    firstname: null,
    orders:[] 
},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
    },
    addOrder: (state, action) => {
        state.value.orders.push(action.payload)
    },
  },
});

export const { login, logout, addOrder } = userSlice.actions;
export default userSlice.reducer;