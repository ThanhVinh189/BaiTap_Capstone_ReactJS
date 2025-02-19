import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./../pages/HomeTemplate/LoginUser/slice";
import listMovieReducer from "./../pages/HomeTemplate/ListMoviePage/slice";
import detailMovieReducer from "./../pages/HomeTemplate/DetailMoviePage/slice";
import tabMovieReducer from "./../pages/HomeTemplate/TabMovie/slice";
import bookingTicketReducer from "./../pages/HomeTemplate/BookingMovie/slice";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import listUsersReducer from "./../pages/AdminTemplate/UsersPage/slice";
import carouselReducer from "../pages/HomeTemplate/CarouselHome/slice";
import profileReducer from "../pages/AdminTemplate/Profile/slice";
import MoviesPageListReducer from "../pages/AdminTemplate/MoviesPageList/slice";
import createShowtimesReducer from "../pages/AdminTemplate/CreateShowtimes/slice";

export const store = configureStore({
  reducer: {
    // Add your child reducers here
    LoginReducer,
    listMovieReducer,
    detailMovieReducer,
    tabMovieReducer,
    bookingTicketReducer,
    authReducer,
    listUsersReducer,
    carouselReducer,
    profileReducer,
    MoviesPageListReducer,
    createShowtimesReducer,
  },
});
