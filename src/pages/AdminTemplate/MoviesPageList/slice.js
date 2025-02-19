import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Thunk để gọi API lấy danh sách phim
export const fetchMoviesPage = createAsyncThunk(
  "moviesPageList/fetchMovies",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP07");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.result.data);
    }
  }
);

// Thunk để gọi API xóa phim
export const deleteMoviePage = createAsyncThunk(
  "moviesPageList/deleteMovie",
  async (maPhim, { rejectWithValue }) => {
    try {
      await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return maPhim;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesPageListSlice = createSlice({
  name: "moviesPageListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lấy danh sách phim
      .addCase(fetchMoviesPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesPage.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xóa phim
      .addCase(deleteMoviePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMoviePage.fulfilled, (state, action) => {
        state.loading = false;
        // Loại bỏ phim đã xóa khỏi state
        state.movies = state.movies.filter(
          (movie) => movie.maPhim !== action.payload
        );
      })
      .addCase(deleteMoviePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesPageListSlice.reducer;
