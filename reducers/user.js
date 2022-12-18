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
    latitude: null,
    longitude: null,
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
      //console.log('action-itinery', action.payload);
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
      state.value.departureAddress = '';
      state.value.arrivalAddress = '';
      state.value.distance = null;
      state.value.time = null;
      state.value.price = null;
      //console.log('removeData', state.value.departure, state.value.arrival);
    },
    setCurrentPosition: (state, action) => {
      // console.log(
      //   'currentPos',
      //   action.payload.latitude,
      //   action.payload.longitude
      // );
      state.value.latitude = action.payload.latitude;
      state.value.longitude = action.payload.longitude;
    },
  },
});

export const {
  login,
  logout,
  addOrder,
  addItinery,
  removeItinery,
  setCurrentPosition,
} = userSlice.actions;
export default userSlice.reducer;
