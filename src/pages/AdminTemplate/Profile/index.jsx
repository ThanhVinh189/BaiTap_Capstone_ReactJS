import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUser } from "./slice";
import {
  Input,
  Button,
  Form,
  Tabs,
  Card,
  message,
  Row,
  Col,
  Skeleton,
  InputNumber,
} from "antd";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.profileReducer);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  useEffect(() => {
    if (status === "idle" && !user) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, status, user]);

  console.log("Dữ liệu user:", user);

  useEffect(() => {
    if (user && Object.keys(user).length > 0 && formData.taiKhoan === "") {
      setFormData({
        taiKhoan: user.taiKhoan,
        matKhau: user.matKhau,
        email: user.email,
        soDT: user.soDT,
        maNhom: "GP07",
        maLoaiNguoiDung: user.maLoaiNguoiDung,
        hoTen: user.hoTen,
      });
    }
  }, [user, formData.taiKhoan]);

  const handleSubmit = () => {
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin thành công!");
      })
      .catch((err) => {
        message.error(`Cập nhật thất bại! ${err}`);
      });
  };

  if (!user || Object.keys(user).length === 0) {
    return <Skeleton active paragraph={{ rows: 4 }} />;
  }

  if (status === "loading") return <Skeleton active />;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  const tabItems = [
    {
      key: "1",
      label: "Thông Tin Cá Nhân",
      children: (
        <>
          <h2 className="text-2xl mb-4">Thông Tin Cá Nhân</h2>
          <Form
            layout="horizontal"
            onFinish={handleSubmit}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className="w-full max-w-lg"
          >
            <Form.Item label="Tài khoản">
              <Input
                value={formData.taiKhoan}
                style={{
                  borderRadius: "8px",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  outline: "none",
                }}
                disabled
              />
            </Form.Item>
            <Form.Item label="Mật khẩu" required>
              <Input.Password
                value={formData.matKhau}
                size="large"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    matKhau: e.target.value,
                  }));
                }}
              />
            </Form.Item>

            <Form.Item label="Email" required>
              <Input
                value={formData.email}
                style={{
                  borderRadius: "8px",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  outline: "none",
                }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" required>
              <InputNumber
                value={formData.soDT}
                style={{ width: "100%" }}
                size="large"
                onChange={(e) =>
                  setFormData({ ...formData, soDT: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Họ Tên" required>
              <Input
                value={formData.hoTen}
                style={{
                  borderRadius: "8px",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  outline: "none",
                }}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
              />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              style={{ marginLeft: "100px" }}
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </Form>
        </>
      ),
    },
    {
      key: "2",
      label: "Lịch Sử Đặt Vé",
      children: (
        <>
          <h2 className="text-2xl mb-4">Lịch Sử Đặt Vé</h2>
          {user?.thongTinDatVe?.map((ve, index) =>
            ve.danhSachGhe.map((ghe, gheIndex) => (
              <Card key={`${index}-${gheIndex}`} className="mb-4">
                <Row gutter={16}>
                  {/* Cột 1: Ảnh Phim */}
                  <Col span={3}>
                    <img
                      alt={ve.tenPhim}
                      src={ve.hinhAnh}
                      style={{
                        width: "150px",
                        height: "200px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>

                  {/* Cột 2: Thông tin ghế và rạp */}
                  <Col span={16}>
                    <h3 className="font-bold text-lg">{ve.tenPhim}</h3>
                    <p>
                      <strong>Ngày đặt: </strong>
                      {new Date(ve.ngayDat).toLocaleDateString("vi-VN")}{" "}
                      {new Date(ve.ngayDat).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <strong>Hệ thống rạp:</strong> {ghe.tenHeThongRap}
                    </p>
                    <p>
                      <strong>Thời lượng:</strong> {ve.thoiLuongPhim} phút
                    </p>
                    <p>
                      <strong>Rạp:</strong> {ghe.tenRap}
                    </p>
                    <p>
                      <strong>Ghế:</strong> {ghe.tenGhe}
                    </p>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto p-5">
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}
