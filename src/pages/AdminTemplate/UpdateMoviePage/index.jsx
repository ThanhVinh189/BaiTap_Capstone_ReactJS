import { useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Input,
  DatePicker,
  Upload,
  Spin,
  Button,
  InputNumber,
  Switch,
} from "antd";
import api from "../../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateMoviePage() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const maPhim = Number(id);
  const navigate = useNavigate();

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
    hinhAnh: null,
    maNhom: "GP07",
  });
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy thông tin phim khi load trang
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
        );
        console.log("API Response:", response);
        const movieData = response.data.content;
        console.log("movieData:", movieData);
        console.log("ngayKhoiChieu:", movieData.ngayKhoiChieu);

        const releaseDate = movieData.ngayKhoiChieu
          ? moment(movieData.ngayKhoiChieu, "YYYY-MM-DDTHH:mm:ss")
          : null;
        console.log("releaseDate:", releaseDate);

        setMovie({
          tenPhim: movieData.tenPhim,
          biDanh: movieData.biDanh,
          trailer: movieData.trailer,
          moTa: movieData.moTa,
          ngayKhoiChieu: releaseDate,
          dangChieu: movieData.dangChieu,
          sapChieu: movieData.sapChieu,
          hot: movieData.hot,
          danhGia: movieData.danhGia,
          hinhAnh: movieData.hinhAnh,
        });

        setPreviewImage(movieData.hinhAnh);

        form.setFieldsValue({
          tenPhim: movieData.tenPhim,
          trailer: movieData.trailer,
          moTa: movieData.moTa,
          ngayKhoiChieu: releaseDate,
          dangChieu: movieData.dangChieu,
          sapChieu: movieData.sapChieu,
          hot: movieData.hot,
          danhGia: movieData.danhGia,
        });
      } catch (error) {
        console.log("error", error);
        console.log("Error response:", error.response.data);
      } finally {
        setLoading(false); // Đảm bảo dừng loading
      }
    };

    fetchMovieDetails();
  }, [maPhim, form]);

  // Handle Date Change
  const handleDateChange = (date, dateString) => {
    setMovie({
      ...movie,
      ngayKhoiChieu: dateString,
    });
  };

  // Handle Switch Change
  const handleSwitchChange = (checked, name) => {
    setMovie({
      ...movie,
      [name]: checked,
    });
  };

  // Handle Image Upload
  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Handle Submit
  const handleSubmit = async (values) => {
    console.log("Submit Movie:", values);

    const formData = new FormData();
    formData.append("maPhim", maPhim);
    formData.append("tenPhim", values.tenPhim);
    formData.append("biDanh", values.biDanh);
    formData.append("trailer", values.trailer);
    formData.append("moTa", values.moTa);
    formData.append("dangChieu", values.dangChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    formData.append("maNhom", "GP07");

    if (values.ngayKhoiChieu) {
      formData.append(
        "ngayKhoiChieu",
        values.ngayKhoiChieu.format("DD/MM/YYYY")
      );
    }

    if (fileList.length > 0) {
      formData.append("hinhAnh", fileList[0].originFileObj);
    }

    try {
      const result = await api.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          TokenCybersoft: "your_cybersoft_token_here",
        },
      });

      console.log("result", result);

      toast.success("Cập nhật phim thành công!", {
        position: "bottom-right",
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/admin/movie-list");
      }, 1500);
    } catch (error) {
      console.log("error", error);

      if (error.response && error.response.data) {
        const messageError = error.response.data.content;
        console.log("messageError: ", messageError);

        toast.error(messageError, {
          position: "bottom-right",
          theme: "colored",
        });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Cập Nhật Phim</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên Phim" name="tenPhim" rules={[{ required: true }]}>
          <Input style={{ borderRadius: "8px" }} />
        </Form.Item>
        <Form.Item label="Trailer" name="trailer">
          <Input style={{ borderRadius: "8px" }} />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Ngày Khởi chiếu" name="ngayKhoiChieu">
          <DatePicker
            format="YYYY-MM-DD" // Phải khớp với định dạng của moment khi set
            onChange={handleDateChange}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu" name="dangChieu">
          <Switch
            checked={movie.dangChieu}
            onChange={(checked) => handleSwitchChange(checked, "dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu" name="sapChieu">
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
        <Form.Item label="Số sao" name="danhGia">
          <InputNumber
            name="danhGia"
            min={0}
            max={10}
            value={movie.danhGia}
            onChange={(value) => setMovie({ ...movie, danhGia: value })}
          />
        </Form.Item>
        <Form.Item label="Hình Ảnh">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onUploadChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            {fileList.length === 0 && "+ Upload"}
          </Upload>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxHeight: "200px",
                marginTop: "10px",
                borderRadius: "18px",
              }}
            />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            color="primary"
            variant="solid"
            size="Large"
            style={{ fontSize: "16px", padding: "18px 12px" }}
            htmlType="submit"
          >
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
}
