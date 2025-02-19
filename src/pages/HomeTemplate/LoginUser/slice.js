import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const actLoginUser = createAsyncThunk(
  "loginUser/actLoginUser",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      localStorage.setItem("userInfo", JSON.stringify(result.data.content));
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Đăng nhập thất bại!");
    }
  }
);

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
