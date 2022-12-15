import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    firstname: null,
    orders: [],
    departure: {},
    arrival: {},
    departureAddress: '',
    arrivalAddress: '',
    distance: null,
    time: null,
    price: null,
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
      state.value.departureAddress = action.payload.departureAddress;
      state.value.arrivalAddress = action.payload.arrivalAddress;
      state.value.distance = action.payload.distance;
      state.value.time = action.payload.time;
      state.value.price = action.payload.price;
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
