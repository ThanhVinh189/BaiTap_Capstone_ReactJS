import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "antd";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user submit", user);

    let newErrors = {};

    if (!user.taiKhoan) {
      newErrors.taiKhoan = "Tài khoản không được để trống!";
    } else if (!/^[a-zA-Z0-9]+$/.test(user.taiKhoan)) {
      newErrors.taiKhoan = "Tài khoản chỉ được chứa chữ không dấu và số!";
    }
    if (!user.matKhau) newErrors.matKhau = "Mật khẩu không được để trống!";
    if (!user.email) newErrors.email = "Email không được để trống!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      newErrors.email = "Email không hợp lệ!";
    if (!user.soDt) newErrors.soDt = "Số điện thoại không được để trống!";
    else if (!/^\d{10}$/.test(user.soDt))
      newErrors.soDt = "Số điện thoại phải có 10 chữ số!";
    if (!user.hoTen) newErrors.hoTen = "Họ tên không được để trống!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await api.post("/QuanLyNguoiDung/DangKy", user);

      toast.success("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...", {
        position: "bottom-right",
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/dangnhap");
      }, 2000);
    } catch (error) {
      console.log("error", error);

      const messageError = error.response.data.content;
      console.log("messageError: ", messageError);

      // hiển thị noti
      toast.error(messageError, {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  return (
    <div
      className="flex justify-center pt-24 pb-20 bg-cover -mt-[80px] relative z-10 bg-no-repeat min-h-screen"
      style={{
        backgroundImage: 'url("https://i.ibb.co/Ybnw70Q/homeappbg.jpg")',
      }}
    >
      <div className="w-full max-w-md p-8 bg-gradient-to-b from-white to-gray-100 text-center rounded-lg shadow-lg animate-slide-down relative">
        {/* Logo */}
        <NavLink
          to=""
          className="flex flex-col items-center text-white no-underline mb-8"
        >
          <img src="./images/film.png" alt="logo" className="w-24 py-2" />
          <span className="text-3xl font-bold text-orange-400">Đăng Ký</span>
        </NavLink>

        {/* Form đăng ký */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full group mb-9">
            <input
              type="text"
              name="taiKhoan"
              onChange={handleOnChange}
              id="floating_taiKhoan"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="taiKhoan"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài khoản
            </label>
            {errors.taiKhoan && (
              <p className="text-red-500 text-sm mt-1 text-left">
                *{errors.taiKhoan}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group !mb-9">
            <input
              type="password"
              name="matKhau"
              onChange={handleOnChange}
              id="floating_password"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mật khẩu
            </label>
            {errors.matKhau && (
              <p className="text-red-500 text-sm mt-1 text-left">
                *{errors.matKhau}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group !mb-9">
            <input
              type="text"
              name="email"
              onChange={handleOnChange}
              id="floating_email"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 text-left">
                *{errors.email}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group !mb-9">
            <input
              type="text"
              name="soDt"
              onChange={handleOnChange}
              id="floating_soDt"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="soDt"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Số Điện Thoại
            </label>
            {errors.soDt && (
              <p className="text-red-500 text-sm mt-1 text-left">
                *{errors.soDt}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group mb-9">
            <input
              type="text"
              name="hoTen"
              onChange={handleOnChange}
              id="floating_hoTen"
              className="block py-3 w-full text-sm text-gray-900 bg-transparent border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none peer"
              placeholder=" "
            />
            <label
              htmlFor="hoTen"
              className="peer-focus:font-bold peer-placeholder-shown:font-normal peer-placeholder-shown:text-lg absolute font-bold text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 top-2 -z-10 left-3 peer-focus:start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-500 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Họ tên
            </label>
            {errors.hoTen && (
              <p className="text-red-500 text-sm mt-1 text-left">
                *{errors.hoTen}
              </p>
            )}
          </div>

          <Button
            color="red"
            variant="solid"
            block
            size="large"
            htmlType="submit"
          >
            Đăng ký
          </Button>
        </form>

        {/* Điều hướng đăng nhập */}
        <p className="mt-4 text-gray-600 text-right text-sm">
          Bạn đã có tài khoản?
          <NavLink to="/dangnhap">
            <Button color="danger" variant="link">
              Đăng nhập ngay !
            </Button>
          </NavLink>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
