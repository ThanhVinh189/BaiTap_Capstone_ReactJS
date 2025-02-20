import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

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

      .addCase(deleteMoviePage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMoviePage.fulfilled, (state, action) => {
        state.loading = false;

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
