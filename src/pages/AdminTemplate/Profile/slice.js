import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
      const userInfo = result.data.content;

      if (userInfo.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue("Bạn không có quyền truy cập trang này");
      }
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Đã xảy ra lỗi");
    }
  }
);

export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.post(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Đã xảy ra lỗi");
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        console.log("Đang tải dữ liệu...");
        state.status = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        console.log("Dữ liệu nhận được:", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        console.log("Lỗi khi lấy dữ liệu:", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
