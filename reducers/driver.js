import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    addDriver: (state, action) => {
        state.value = action.payload
        console.log(action.payload);
    },

    removeDriver: (state, action) => {
        state.value = {}
    }

    
  },
});

export const {addDriver, removeDriver} = driverSlice.actions;
export default driverSlice.reducer;
