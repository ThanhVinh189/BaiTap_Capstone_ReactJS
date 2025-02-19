import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchListUsers = createAsyncThunk(
  "listUsersPage/fetchListUsers",
  async (tuKhoa, { rejectWithValue }) => {
    try {
      const url = tuKhoa
        ? `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP07&tuKhoa=${tuKhoa}`
        : "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP07";
      const result = await api.get(url);

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "listUsers/deleteUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const listUsersPageSlice = createSlice({
  name: "listUsersPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (user) => user.taiKhoan !== action.meta.arg
      );
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default listUsersPageSlice.reducer;
