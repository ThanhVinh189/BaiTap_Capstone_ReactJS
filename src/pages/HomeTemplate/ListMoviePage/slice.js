import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchListMovie = createAsyncThunk(
  "listMoviePage/fetchListMovie",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP07");
      const listMovies = result.data.content;

      const moviesWithLichChieu = await Promise.all(
        listMovies.map(async (movie) => {
          try {
            const res = await api.get(
              `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movie.maPhim}`
            );
            const heThongRapChieu = res.data.content.heThongRapChieu;

            if (heThongRapChieu && heThongRapChieu.length > 0) {
              const cumRapChieu = heThongRapChieu[0].cumRapChieu;
              if (cumRapChieu && cumRapChieu.length > 0) {
                const lichChieuPhim = cumRapChieu[0].lichChieuPhim;
                if (lichChieuPhim && lichChieuPhim.length > 0) {
                  movie.maLichChieu = lichChieuPhim[0].maLichChieu;
                }
              }
            }
          } catch (error) {
            console.error(
              `Lỗi khi lấy maLichChieu cho phim ${movie.maPhim}:`,
              error
            );
          }

          return movie;
        })
      );

      return moviesWithLichChieu;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listMoviePageSlice = createSlice({
  name: "listMoviePageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default listMoviePageSlice.reducer;
