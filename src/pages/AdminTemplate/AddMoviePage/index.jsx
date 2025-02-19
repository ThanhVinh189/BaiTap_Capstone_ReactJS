import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Switch,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function AddMoviePage() {
  const [movie, setMovie] = useState({
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    maNhom: "GP07",
  });
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setMovie({
      ...movie,
      ngayKhoiChieu: dateString,
    });
  };

  const handleSwitchChange = (checked, name) => {
    setMovie({
      ...movie,
      [name]: checked,
    });
  };

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async () => {
    console.log("Submit Movie:", movie);

    const formData = new FormData();
    formData.append("tenPhim", movie.tenPhim);
    formData.append("biDanh", movie.biDanh);
    formData.append("trailer", movie.trailer);
    formData.append("moTa", movie.moTa);
    formData.append("ngayKhoiChieu", movie.ngayKhoiChieu);
    formData.append("dangChieu", movie.dangChieu);
    formData.append("sapChieu", movie.sapChieu);
    formData.append("hot", movie.hot);
    formData.append("danhGia", movie.danhGia);
    formData.append("maNhom", movie.maNhom);

    if (fileList.length > 0) {
      formData.append("hinhAnh", fileList[0].originFileObj);
    }

    try {
      await api.post("/QuanLyPhim/ThemPhimUploadHinh", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Thêm phim thành công!", {
        position: "bottom-right",
        autoClose: 1000, // Giảm thời gian hiện thông báo còn 1 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Chờ 1 giây rồi chuyển trang
      setTimeout(() => {
        navigate("/admin/movie-list");
      }, 1000);
    } catch (error) {
      const messageError = error.response?.data?.content || "Có lỗi xảy ra!";
      toast.error(messageError, {
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
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Thêm Phim Mới</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên Phim"
            name="tenPhim"
            rules={[
              { required: true, message: "*Tên phim không được để trống" },
            ]}
          >
            <Input
              name="tenPhim"
              value={movie.tenPhim}
              style={{ borderRadius: " 8px", marginBottom: "5px" }}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[
              {
                type: "url",
                message: "*Vui lòng nhập URL hợp lệ",
              },
            ]}
          >
            <Input
              name="trailer"
              value={movie.trailer}
              style={{ borderRadius: " 8px", marginBottom: "5px" }}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: "*Mô tả không được để trống" }]}
          >
            <Input.TextArea
              name="moTa"
              value={movie.moTa}
              style={{ marginBottom: "5px" }}
              onChange={handleOnChange}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Ngày Khởi chiếu"
            name="ngayKhoiChieu"
            rules={[
              { required: true, message: "*Vui lòng chọn ngày khởi chiếu" },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              size="large"
              style={{ marginBottom: "5px" }}
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item
            label="Đang Chiếu"
            name="dangChieu"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                  if (value && movie.sapChieu) {
                    return Promise.reject(
                      new Error(
                        "*Chỉ được chọn một trong hai: Đang Chiếu hoặc Sắp Chiếu"
                      )
                    );
                  }
                  if (!value && !movie.sapChieu) {
                    return Promise.reject(
                      new Error(
                        "*Phải chọn một trong hai: Đang Chiếu hoặc Sắp Chiếu"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Switch
              checked={movie.dangChieu}
              onChange={(checked) => handleSwitchChange(checked, "dangChieu")}
            />
          </Form.Item>

          <Form.Item
            label="Sắp Chiếu"
            name="sapChieu"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                  if (value && movie.dangChieu) {
                    return Promise.reject(
                      new Error(
                        "*Chỉ được chọn một trong hai: Đang Chiếu hoặc Sắp Chiếu"
                      )
                    );
                  }
                  if (!value && !movie.dangChieu) {
                    return Promise.reject(
                      new Error(
                        "*Phải chọn một trong hai: Đang Chiếu hoặc Sắp Chiếu"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Switch
              checked={movie.sapChieu}
              onChange={(checked) => handleSwitchChange(checked, "sapChieu")}
            />
          </Form.Item>

          <Form.Item label="Hot" name="hot">
            <Switch
              checked={movie.hot}
              onChange={(checked) => handleSwitchChange(checked, "hot")}
            />
          </Form.Item>

          <Form.Item
            label="Số sao"
            name="danhGia"
            rules={[
              {
                type: "number",
                min: 0,
                max: 10,
                message: "*Số sao phải từ 0 đến 10",
              },
            ]}
          >
            <InputNumber
              name="danhGia"
              min={0}
              max={10}
              size="large"
              value={movie.danhGia}
              onChange={(value) => setMovie({ ...movie, danhGia: value })}
            />
          </Form.Item>

          <Form.Item
            label="Hình Ảnh"
            required
            rules={[
              {
                validator: () => {
                  if (fileList.length === 0) {
                    return Promise.reject(new Error("*Vui lòng chọn hình ảnh"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              beforeUpload={() => false}
              onChange={onUploadChange}
              fileList={fileList}
              listType="picture"
              maxCount={1}
            >
              <Button size="large" icon={<UploadOutlined />}>
                Chọn tệp
              </Button>
            </Upload>
            {/* Hiển thị ảnh xem trước */}
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  marginTop: "10px",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button size="large" type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}
