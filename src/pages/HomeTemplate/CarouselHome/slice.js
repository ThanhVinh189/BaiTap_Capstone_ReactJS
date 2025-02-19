import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchCarousel = createAsyncThunk(
  "carousel/fetchCarousel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/QuanLyPhim/LayDanhSachBanner");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const carouselSlice = createSlice({
  name: "carouselSlice",
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarousel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCarousel.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    });
    builder.addCase(fetchCarousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default carouselSlice.reducer;
