import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Thunk để lấy thông tin hệ thống rạp
export const fetchHeThongRap = createAsyncThunk(
  "createShowtimes/fetchHeThongRap",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để lấy thông tin cụm rạp theo hệ thống
export const fetchCumRap = createAsyncThunk(
  "createShowtimes/fetchCumRap",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchThongTinPhim = createAsyncThunk(
  "createShowtimes/fetchThongTinPhim ",
  async (maPhim, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để tạo lịch chiếu
export const createShowtime = createAsyncThunk(
  "createShowtimes/createShowtime",
  async (showtimeData, { rejectWithValue }) => {
    try {
      const response = await api.post("QuanLyDatVe/TaoLichChieu", showtimeData);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Đã xảy ra lỗi");
    }
  }
);

const initialState = {
  heThongRap: [],
  cumRap: [],
  lichChieu: [],
  movie: {},
  successMessage: "",
  error: "",
  loading: false,
};

const createShowtimesSlice = createSlice({
  name: "createShowtimes",
  initialState,
  reducers: {
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchHeThongRap
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
      // fetchCumRap
      .addCase(fetchCumRap.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCumRap.fulfilled, (state, action) => {
        state.loading = false;
        state.cumRap = action.payload;
      })
      .addCase(fetchCumRap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchThongTinPhim
      .addCase(fetchThongTinPhim.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThongTinPhim.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchThongTinPhim.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createShowtime
      .addCase(createShowtime.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createShowtime.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Tạo lịch chiếu thành công!";
      })
      .addCase(createShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccessMessage, resetError } = createShowtimesSlice.actions;
export default createShowtimesSlice.reducer;
