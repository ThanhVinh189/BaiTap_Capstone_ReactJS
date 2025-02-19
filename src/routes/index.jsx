import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import BookingMovie from "../pages/HomeTemplate/BookingMovie";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import TabMovie from "../pages/HomeTemplate/TabMovie";
import LoginUser from "../pages/HomeTemplate/LoginUser";
import RegisterUser from "../pages/HomeTemplate/RegisterUser";
import DetailMoviePage from "./../pages/HomeTemplate/DetailMoviePage";
import PageNotFound from "../pages/PageNotFound";

import AdminTemplate from "../pages/AdminTemplate";
import MoviesPageList from "../pages/AdminTemplate/MoviesPageList";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import UsersPage from "../pages/AdminTemplate/UsersPage";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import UpdateMoviePage from "../pages/AdminTemplate/UpdateMoviePage";
import createShowtime from "../pages/AdminTemplate/CreateShowtimes";
import UpdateUserPage from "../pages/AdminTemplate/UpdateUserPage";
import Profile from "./../pages/AdminTemplate/Profile";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    children: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "dat-ve/:maLichChieu",
        element: BookingMovie,
      },
      {
        path: "list-movie",
        element: ListMoviePage,
      },
      {
        path: "dangnhap",
        element: LoginUser,
      },
      {
        path: "dangky",
        element: RegisterUser,
      },
      {
        path: "detail/:id",
        element: DetailMoviePage,
      },
      {
        path: "danh-sach-rap",
        element: TabMovie,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    children: [
      {
        path: "movie-list",
        element: MoviesPageList,
      },
      {
        path: "add-user",
        element: AddUserPage,
      },
      {
        path: "update-user/:taiKhoan",
        element: UpdateUserPage,
      },
      {
        path: "users",
        element: UsersPage,
      },
      {
        path: "add-movie",
        element: AddMoviePage,
      },
      {
        path: "update-movie/:id",
        element: UpdateMoviePage,
      },
      {
        path: "showtime/:maPhim",
        element: createShowtime,
      },
      {
        path: "thong-tin-ca-nhan",
        element: Profile,
      },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
