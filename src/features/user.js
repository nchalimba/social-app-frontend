//represents user reducer and slice
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  id: "",
  username: "",
  email: "",
  profilePicture: "",
  firstName: "",
  lastName: "",
  description: "",
  city: "",
  country: "",
  relationship: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
    update: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
