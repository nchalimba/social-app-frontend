import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  color: "color1",
  background: "light-theme",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: initialStateValue },
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
    changeColor: (state, action) => {
      state.value.color = action.payload;
    },
    changeBackground: (state, action) => {
      state.value.background = action.payload;
    },
  },
});

export const { change, changeColor, changeBackground } = themeSlice.actions;

export default themeSlice.reducer;
