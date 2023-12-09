import { createSlice, configureStore } from "@reduxjs/toolkit";

const loginState = { login: false, user: [] };
const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    LOGIN(state, action) {
      state.login = true;
      state.user = action.payload;
    },
    LOGOUT(state) {
      state.login = false;
      state.user = [];
    },
  },
});

const searchInfo = { searchInfo: [] };
const searchInfoSlice = createSlice({
  name: "searchInfo",
  initialState: searchInfo,
  reducers: {
    ON_ADD(state, action) {
      state.searchInfo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    searchInfo: searchInfoSlice.reducer,
  },
});

export const loginAction = loginSlice.actions;
export const searchInfoAction = searchInfoSlice.actions;
export default store;
