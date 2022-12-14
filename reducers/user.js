import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    firstname: null,
    orders: [],
    departure: {},
    arrival: {},
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
      state.value.orders.push(action.payload);
    },
    addItinery: (state, action) => {
      console.log('action-itinery', action.payload);
      state.value.departure = action.payload.departure;
      state.value.arrival = action.payload.arrival;
    },
    removeItinery: (state) => {
      state.value.departure = {};
      state.value.arrival = {};
      console.log('removeData', state.value.departure, state.value.arrival);
    },
  },
});

export const { login, logout, addOrder, addItinery, removeItinery } =
  userSlice.actions;
export default userSlice.reducer;
