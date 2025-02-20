// Import cần thiết
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../LoginUser/slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Avatar, Button, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.LoginReducer.data);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <span onClick={handleLogout} className="text-red-600 cursor-pointer">
          Đăng xuất
        </span>
      ),
    },
  ];

  return (
    <nav className="bg-gray-900/50 border-gray-200 dark:bg-gray-900/70 sticky w-full h-20 z-20 top-0 shadow-md dark:border-gray-700">
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="./images/film.png"
            className="h-14 w-14"
            alt="CINEMA Logo"
          />
          <span className="text-3xl font-semibold text-orange-400">CINEMA</span>
        </a>

        {/* Menu */}
        <div className="flex-grow flex justify-center">
          <ul className="font-medium flex space-x-8 text-xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 font-bold no-underline"
                    : "text-white dark:text-white hover:text-orange-400 no-underline"
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-movie"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 font-bold no-underline"
                    : "text-white dark:text-white hover:text-orange-400 no-underline"
                }
              >
                Movie
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/danh-sach-rap"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 font-bold no-underline"
                    : "text-white dark:text-white hover:text-orange-400 no-underline"
                }
              >
                Rạp
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Đăng nhập / Đăng ký hoặc Hiển thị user */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center bg-white/10 space-x-3 p-2 rounded-lg border border-gray-100">
              <span className="text-orange-400 font-medium">
                Hi, {user.hoTen}
              </span>
              {/* Dropdown Avatar */}
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Space>
                  <Badge dot color="green">
                    <Avatar
                      shape="square"
                      icon={<UserOutlined />}
                      className="cursor-pointer"
                    />
                  </Badge>
                </Space>
              </Dropdown>
            </div>
          ) : (
            <>
              <Link to="/dangnhap">
                <Button color="cyan" variant="filled" size="large">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/dangky">
                <Button color="pink" variant="filled" size="large">
                  Đăng ký
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
