import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

import api from "../../../services/api";

export const fetchListSeats = createAsyncThunk(
  "bookingTicket/fetchListSeats",
  async (MaLichChieu, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Lỗi kết nối!");
    }
  }
);

export const datVe = createAsyncThunk(
  "bookingTicket/datVe",
  async (thongTinDatVe, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyDatVe/DatVe", thongTinDatVe);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Lỗi kết nối!");
    }
  }
);

const initialState = {
  listSeats: [],
  listSeatsSelected: [],
  movieDetail: null,
  loading: false,
  error: null,
  isBookingSuccess: false,
};

const bookingTicketSlice = createSlice({
  name: "bookingTicketSlice",
  initialState,
  reducers: {
    setSeatSelected: (state, action) => {
      const seat = action.payload;
      const index = state.listSeatsSelected.findIndex(
        (item) => item.maGhe === seat.maGhe
      );

      if (index !== -1) {
        state.listSeatsSelected.splice(index, 1);
      } else {
        state.listSeatsSelected.push(seat);
      }
    },
    removeSeatSelected: (state, action) => {
      const seatId = action.payload;
      state.listSeatsSelected = state.listSeatsSelected.filter(
        (item) => item.maGhe !== seatId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.listSeats = action.payload.danhSachGhe;
        state.movieDetail = action.payload.thongTinPhim;
        state.isBookingSuccess = false;
      })
      .addCase(fetchListSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(datVe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(datVe.fulfilled, (state) => {
        state.loading = false;
        state.listSeatsSelected = [];
        state.isBookingSuccess = true;
        message.success("Đặt vé thành công!");
      })
      .addCase(datVe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error("Đặt vé thất bại: " + action.payload);
      });
  },
});

export const { setSeatSelected, removeSeatSelected } =
  bookingTicketSlice.actions;
export default bookingTicketSlice.reducer;
