import { createSlice } from "@reduxjs/toolkit";
import cookie from "react-cookies";
import { authApis, endpoints } from "../configs/APIs";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      cookie.remove("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

// 🔥 Async thunk: load user từ token
export const fetchUserFromToken = () => async (dispatch) => {
  const token = cookie.load("token");
  if (token) {
    try {
      dispatch(loginStart());
      const res = await authApis().get(endpoints["my-profile"]);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.error("Không thể lấy thông tin user:", err);
      dispatch(loginFailure(err.message));
      cookie.remove("token");
    }
  }
};

export default userSlice.reducer;
