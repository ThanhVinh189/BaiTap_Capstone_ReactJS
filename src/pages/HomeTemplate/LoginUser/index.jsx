import { useState, useEffect } from "react";
import { actLoginUser } from "./slice";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";

export default function LoginUser() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.LoginReducer || {});
  const { data, error, loading } = loginState;

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  useEffect(() => {
    if (data) {
      toast.success("Đăng nhập thành công! 🎉", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
  }, [data]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actLoginUser(user));
  };

  if (data) return <Navigate to="/" />;

  return (
    <section
      className="flex justify-center pt-28 pb-20 bg-cover -mt-[80px] relative z-10 bg-no-repeat min-h-screen"
      style={{
        backgroundImage: 'url("https://i.ibb.co/Ybnw70Q/homeappbg.jpg")',
      }}
    >
      <div className="w-full max-w-md p-8 bg-gradient-to-b from-white to-gray-100 text-center rounded-lg shadow-lg animate-slide-down relative">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex flex-col items-center text-white no-underline mb-6"
        >
          <img src="./images/film.png" alt="logo" className="w-24 py-2" />
          <span className="text-3xl font-bold text-orange-400">Đăng Nhập</span>
        </NavLink>

        {/* Thông báo */}
        <p className="text-gray-500 text-sm mb-6">
          Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </p>

        {/* Form đăng nhập */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative z-0 w-full group mb-9" >
            <input
              type="text"
              name="taiKhoan"
              value={user.taiKhoan}
              onChange={handleOnChange}
              id="floating_taiKhoan"
              className="block py-3 mb-5 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="taiKhoan"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài khoản
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnChange}
              id="floating_password"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mật khẩu
            </label>
          </div>
          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-red-500 text-sm mb-4">*{error}</p>}
          <Button
            color="red"
            variant="solid"
            block
            size="large"
            htmlType="submit"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        {/* Điều hướng đăng ký */}
        <p className="mt-4 text-gray-600 text-sm text-right">
          Bạn chưa có tài khoản?
          <NavLink to="/dangky">
            <Button color="danger" variant="link">
              Đăng ký ngay !
            </Button>
          </NavLink>
        </p>
      </div>
    </section>
  );
}
