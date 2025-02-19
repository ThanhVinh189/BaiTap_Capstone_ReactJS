import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Space,
  InputNumber,
} from "antd";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../services/api";

const { Title } = Typography;
const { Option } = Select;

export default function AddUserPage() {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSelectChange = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/QuanLyNguoiDung/ThemNguoiDung", user);

      toast.success("Thêm người dùng thành công!", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      const messageError = error.response?.data?.content || "Có lỗi xảy ra!";
      toast.error(messageError, {
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="mx-auto w-2/3 p-5">
      <Title level={2} className="w-2/3 text-center !mb-10">
        Thêm Người Dùng
      </Title>

      <div className="flex justify-center w-2/3 mr-20">
        <Form
          onFinish={handleSubmit}
          layout="horizontal"
          className="w-full max-w-lg"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input
              name="taiKhoan"
              onChange={handleOnChange}
              value={user.taiKhoan}
              style={{
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              name="matKhau"
              onChange={handleOnChange}
              size="large"
              value={user.matKhau}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ!",
              },
            ]}
          >
            <Input
              name="email"
              style={{
                borderRadius: "8px",
                outline: "none",
              }}
              onChange={handleOnChange}
              value={user.email}
            />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="soDt"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <InputNumber
              name="soDt"
              onChange={handleOnChange}
              size="large"
              value={user.soDt}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input
              name="hoTen"
              style={{
                borderRadius: "8px",
                outline: "none",
              }}
              onChange={handleOnChange}
              value={user.hoTen}
            />
          </Form.Item>

          <Form.Item
            label="Loại người dùng"
            name="maLoaiNguoiDung"
            rules={[
              { required: true, message: "Vui lòng chọn loại người dùng!" },
            ]}
          >
            <Select
              onChange={(value) => handleSelectChange(value, "maLoaiNguoiDung")}
              value={user.maLoaiNguoiDung}
              size="large"
            >
              <Option value="KhachHang">Khách Hàng</Option>
              <Option value="QuanTri">Quản Trị</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ marginLeft: "50px" }}>
              <Button
                size="large"
                style={{ width: "100px" }}
                htmlType="button"
                onClick={() => navigate("/admin/users")}
              >
                Trở Lại
              </Button>
              <Button
                size="large"
                style={{ width: "100px" }}
                type="primary"
                htmlType="submit"
              >
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>

      <ToastContainer />
    </div>
  );
}
