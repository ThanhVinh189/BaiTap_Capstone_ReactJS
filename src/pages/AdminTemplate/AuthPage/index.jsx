import { useState, useEffect } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";

export default function AuthPage() {
  const state = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (values) => {
    console.log(values);
    dispatch(actLogin(values));
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.maLoaiNguoiDung === "KhachHang") {
      toast.warning("Bạn không có quyền truy cập trang này!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (state.data) {
      toast.success("Đăng nhập thành công!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [state.data]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error.response?.data?.content || "Đã xảy ra lỗi!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [state.error]);

  if (state.data) {
    return <Navigate to="/admin/movie-list" />;
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100/50 relative "
      style={{
        backgroundImage: "url('/images/bg-admin.jpg')",
      }}
    >
      <Card className="w-full max-w-sm p-5 shadow-lg rounded-lg">
        <Typography.Title level={2} className="text-cente font-bold">
          Đăng Nhập
        </Typography.Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input
              placeholder="Nhập Tài khoản"
              name="taiKhoan"
              onChange={handleOnChange}
              style={{ borderRadius: "8px", height: "40px" }}
            />
          </Form.Item>

          <Form.Item
            label="Your password"
            name="matKhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Nhập Mật khẩu"
              name="matKhau"
              onChange={handleOnChange}
              style={{ borderRadius: "8px", height: "43px" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ height: "40px" }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
}
