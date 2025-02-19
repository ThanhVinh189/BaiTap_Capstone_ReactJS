import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeThongRap,
  fetchCumRap,
  fetchThongTinPhim,
  createShowtime,
  resetSuccessMessage,
  resetError,
} from "./slice";
import { useParams } from "react-router-dom";
import { Select, Input, Button, Form } from "antd";

export default function CreateShowtimes() {
  const { maPhim } = useParams();
  const dispatch = useDispatch();
  const { heThongRap, cumRap, movie, successMessage, error, loading } =
    useSelector((state) => state.createShowtimesReducer);

  const [form, setForm] = useState({
    maPhim: maPhim || "",
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: "",
    maNhom: "GP07", // Sử dụng mã nhóm GP07
  });

  // 🆕 Cập nhật maPhim khi component đã mount
  useEffect(() => {
    if (maPhim) {
      setForm((prev) => ({
        ...prev,
        maPhim: maPhim, // Gán maPhim vào form
      }));
    }
  }, [maPhim]);
  console.log("maPhim:", maPhim);

  useEffect(() => {
    if (maPhim) {
      dispatch(fetchThongTinPhim(maPhim)); // Gọi API lấy thông tin phim
    }
  }, [maPhim, dispatch]);

  useEffect(() => {
    dispatch(fetchHeThongRap());
  }, [dispatch]);

  // 🆕 Định dạng ngày giờ theo yêu cầu API
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00";
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // 🆕 Cập nhật form khi thay đổi giá trị
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSelectHeThongRap = (value) => {
    if (value) {
      dispatch(fetchCumRap(value));
      setForm({ ...form, maRap: "" }); // Reset cụm rạp khi đổi hệ thống rạp
    }
  };

  const handleSubmit = () => {
    const formattedDate = formatDateTime(form.ngayChieuGioChieu);

    const payload = {
      ...form,
      ngayChieuGioChieu: formattedDate, // Định dạng lại ngày giờ
    };

    dispatch(createShowtime(payload));
  };

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      dispatch(resetSuccessMessage());
    }
    if (error) {
      alert(error);
      dispatch(resetError());
    }
  }, [successMessage, error, dispatch]);

  return (
    <div className="p-4 flex flex-col justify-center gap-1 ">
      <h2 className="text-2xl font-bold mb-4">
        Thêm Lịch Chiếu - {movie?.tenPhim}
      </h2>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmit}
        className=" bg-white p-5 shadow-md rounded-lg flex flex-col md:flex-row gap-2"
      >
        {/* Hình ảnh và tên phim */}
        <div className=" flex-shrink-0">
          <div
            style={{
              backgroundImage: `url(${movie?.hinhAnh})`,
              backgroundSize: "cover",
              height: "400px",
              width: "300px",
              borderRadius: "8px",
            }}
          />
        </div>

        <div className="flex-grow md:ml-4">
          {/* Chọn Hệ Thống Rạp */}
          <Form.Item
            label="Hệ Thống Rạp"
            required
            className="mb-4 w-4/5 font-semibold"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            <Select
              placeholder="Chọn Hệ Thống Rạp"
              onChange={handleSelectHeThongRap}
              options={heThongRap.map((item) => ({
                label: item.tenHeThongRap,
                value: item.maHeThongRap,
              }))}
              className="rounded-md h-10 text-lg"
            />
          </Form.Item>

          {/* Chọn Cụm Rạp */}
          <Form.Item
            label="Cụm Rạp"
            required
            className="mb-4 w-4/5 font-semibold"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
          >
            <Select
              placeholder="Chọn Cụm Rạp"
              onChange={(value) => handleChange("maRap", value)}
              value={form.maRap}
              options={cumRap.map((item) => ({
                label: item.tenCumRap,
                value: item.maCumRap,
              }))}
              disabled={!cumRap.length}
              className="rounded-md h-10 text-lg"
            />
          </Form.Item>

          {/* Giá Vé */}
          <Form.Item
            label="Giá Vé"
            required
            className="mb-4 w-1/3 font-semibold"
            labelCol={{ span: 11 }}
            wrapperCol={{ span: 14 }}
          >
            <Input
              type="number"
              value={form.giaVe}
              placeholder="Nhập giá vé"
              onChange={(e) => handleChange("giaVe", e.target.value)}
              className="rounded-md"
            />
          </Form.Item>

          {/* Ngày Chiếu Giờ Chiếu */}
          <Form.Item
            label="Ngày Giờ Chiếu"
            required
            className="mb-4 w-2/4 font-semibold"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 10 }}
          >
            <Input
              type="datetime-local"
              value={form.ngayChieuGioChieu}
              onChange={(e) =>
                handleChange("ngayChieuGioChieu", e.target.value)
              }
              className="rounded-md"
            />
          </Form.Item>

          {/* Button Submit */}
          <Form.Item wrapperCol={{ span: 3 }} className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              className="w-full h-10 rounded-md ml-5"
            >
              {loading ? "Đang xử lý..." : "Tạo Lịch Chiếu"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
