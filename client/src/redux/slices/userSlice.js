// const { createSlice } = require('@reduxjs/toolkit');
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
