import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;

      // Ensure subscribedChannels exists
      if (!Array.isArray(state.currentUser.subscribedChannels)) {
        state.currentUser.subscribedChannels = [];
      }
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (!state.currentUser) return;

      if (!Array.isArray(state.currentUser.subscribedChannels)) {
        state.currentUser.subscribedChannels = [];
      }

      const index = state.currentUser.subscribedChannels.indexOf(action.payload);
      if (index !== -1) {
        state.currentUser.subscribedChannels.splice(index, 1); // Unsubscribe
      } else {
        state.currentUser.subscribedChannels.push(action.payload); // Subscribe
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
} = userSlice.actions;

export default userSlice.reducer;
