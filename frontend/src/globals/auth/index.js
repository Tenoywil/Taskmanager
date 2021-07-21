import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  token: "",
  triggerTaskReload: false,
  notification: {
    message: "",
    type: "",
  },
  display: false,
};
let authSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTriggerTaskReload: (state, action) => {
      state.triggerTaskReload = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    logout: () => defaultState,
  },
});
export const getToken = ({ auth: state }) => state.token;
export const getDisplay = ({ auth: state }) => state.display;
export const getNotification = ({ auth: state }) => state.notification;
export const getTriggerTaskReload = ({ auth: state }) =>
  state.triggerTaskReload;

export const {
  setToken,
  logout,
  setTriggerTaskReload,
  setNotification,
  setDisplay,
} = authSlice.actions;
export default authSlice.reducer;
