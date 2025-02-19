import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Fetch hệ thống rạp
export const fetchHeThongRap = createAsyncThunk(
  "tabMovie/fetchHeThongRap",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyRap/LayThongTinHeThongRap");

      if (!result.data || !result.data.content) {
        throw new Error("Dữ liệu hệ thống rạp không hợp lệ!");
      }

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

export const fetchLichChieuRap = createAsyncThunk(
  "tabMovie/fetchLichChieu",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP07"
      );

      if (!result.data || !result.data.content) {
        throw new Error("Dữ liệu không hợp lệ!");
      }

      // Chuyển đổi dữ liệu thành object theo hệ thống rạp
      const dataByHeThongRap = {};
      result.data.content.forEach((heThong) => {
        dataByHeThongRap[heThong.maHeThongRap] = {
          ...heThong,
          cumRap: heThong.lstCumRap,
        };
      });

      return dataByHeThongRap;
    } catch (error) {
      console.error("❌ Lỗi khi lấy dữ liệu:", error);
      return rejectWithValue(error.message || "Lỗi không xác định");
    }
  }
);

const initialState = {
  heThongRap: [], 
  cumRap: {}, 
  lichChieu: {}, 
  loading: false,
  error: null,
};

const tabMovieSlice = createSlice({
  name: "tabMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeThongRap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeThongRap.fulfilled, (state, action) => {
        state.loading = false;
        state.heThongRap = action.payload;
      })
      .addCase(fetchHeThongRap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLichChieuRap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLichChieuRap.fulfilled, (state, action) => {
        state.loading = false;
        state.lichChieu = action.payload; 
        state.cumRap = Object.fromEntries(
          Object.entries(action.payload).map(([key, value]) => [
            key,
            value.cumRap,
          ])
        );
      })
      .addCase(fetchLichChieuRap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tabMovieSlice.reducer;
