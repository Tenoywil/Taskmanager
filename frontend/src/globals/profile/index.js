import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  profileOne: {},
  profiles: [],
  tasks: [],
  task: {},
};
let profileSlice = createSlice({
  name: "profile",
  initialState: defaultState,
  reducers: {
    setProfile: (state, action) => {
      state.profileOne = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setDefault: () => defaultState,
  },
});
export const getProfile = ({ profile: state }) => state.profileOne;
export const getProfiles = ({ profile: state }) => state.profiles;
export const getTasks = ({ profile: state }) => state.tasks;
export const getTask = ({ profile: state }) => state.task;

export const { setProfile, setProfiles, setTasks, setTask, setDefault } =
  profileSlice.actions;
export default profileSlice.reducer;
