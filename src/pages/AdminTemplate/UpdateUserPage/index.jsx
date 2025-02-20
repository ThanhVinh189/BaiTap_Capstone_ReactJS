import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  InputNumber,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;

export default function UpdateUserPage() {
  const { taiKhoan } = useParams();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const [loaiNguoiDung, setLoaiNguoiDung] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);
  console.log("User state:", user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [loaiNguoiDungRes, userInfoRes] = await Promise.all([
          api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),
          api.post(
            `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
            {
              taiKhoan: taiKhoan,
            }
          ),
        ]);
        setLoaiNguoiDung(loaiNguoiDungRes.data.content);
        setUser(userInfoRes.data.content);
        console.log("userInfoRes:", userInfoRes);
      } catch (error) {
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);
          console.log("Headers:", error.response.headers);
          toast.error(error.response.data?.content || "Lỗi không xác định!");
        } else if (error.request) {
          console.error("Không nhận được phản hồi từ server:", error.request);
          toast.error("Không thể kết nối đến server!");
        } else {
          console.error("Lỗi khi gửi request:", error.message);
          toast.error("Lỗi không xác định!");
        }

        if (error.response?.data?.content) {
          toast.error(error.response.data.content);
        } else {
          console.error("Lỗi khi cập nhật người dùng: ", error);
          console.log("Response:", error.response);
          console.log("Config:", error.config);
          toast.error("Cập nhật người dùng thất bại!");
        }
        console.error("Lỗi khi cập nhật người dùng: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [taiKhoan]);

  const onFinish = async (values) => {
    try {
      await api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
        ...values,
        maNhom: "GP07",
      });
      toast.success("Cập nhật người dùng thành công!");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Cập nhật người dùng thất bại!");
      console.error("Lỗi khi cập nhật người dùng: ", error);
    }
  };

  return (
    <div className="mx-auto w-2/3 p-5">
      <Title level={2} className="w-2/3 text-center !mb-10">
        Cập Nhật Thông Tin Người Dùng
      </Title>

      <div className="flex justify-center w-2/3 mr-20">
        <Form
          form={form}
          layout="horizontal"
          initialValues={user}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="w-full max-w-lg"
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
          >
            <Input
              disabled
              style={{
                borderRadius: "8px",
                borderColor: "rgba(0, 0, 0, 0.2)",
                outline: "none",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password name="matKhau" size="large" />
          </Form.Item>
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input
              style={{
                borderRadius: "8px",
                borderColor: "rgba(0, 0, 0, 0.2)",
                outline: "none",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input
              style={{
                borderRadius: "8px",
                borderColor: "rgba(0, 0, 0, 0.2)",
                outline: "none",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="soDT"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <InputNumber size="large" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Loại người dùng"
            name="maLoaiNguoiDung"
            rules={[
              { required: true, message: "Vui lòng chọn loại người dùng" },
            ]}
          >
            <Select size="large" placeholder="Chọn loại người dùng">
              {loaiNguoiDung.map((item) => (
                <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>
                  {item.tenLoai}
                </Option>
              ))}
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
                {loading ? "Đang tải..." : "Cập nhật"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}
