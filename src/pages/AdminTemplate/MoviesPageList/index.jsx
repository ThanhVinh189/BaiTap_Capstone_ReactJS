import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesPage, deleteMoviePage } from "./slice";
import {
  Table,
  Button,
  Image,
  Input,
  Space,
  Tooltip,
  Alert,
  Popconfirm,
  message,
  Skeleton,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function MoviesPageList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(
    (state) => state.MoviesPageListReducer
  );
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    dispatch(fetchMoviesPage());
  }, [dispatch]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearch = (value) => {
    const filtered = movies.filter((movie) =>
      movie.tenPhim.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleAddMovie = () => {
    navigate("/admin/add-movie");
  };

  const handleEditClick = (movie) => {
    navigate(`/admin/update-movie/${movie.maPhim}`);
  };

  const handleDelete = (maPhim) => {
    dispatch(deleteMoviePage(maPhim))
      .unwrap()
      .then(() => {
        message.success("Xóa phim thành công!");
      })
      .catch(() => {
        message.error("Xóa phim thất bại!");
      });
  };

  const handleShowtimesClick = (movie) => {
    navigate(`/admin/showtime/${movie.maPhim}`);
  };

  const columns = [
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Mã phim</span>
      ),
      dataIndex: "maPhim",
      key: "maPhim",
      width: "10%",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
        multiple: 2,
      },
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Hình ảnh</span>
      ),
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <Image
          src={text}
          alt="Poster"
          width={90}
          height={100}
          style={{ borderRadius: "8px" }}
        />
      ),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Tên phim</span>
      ),
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: {
        compare: (a, b) => a.tenPhim - b.tenPhim,
        multiple: 1,
      },
      render: (text) => <span style={{ fontSize: "16px" }}>{text}</span>,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Mô tả</span>
      ),
      dataIndex: "moTa",
      key: "moTa",
      render: (text) => <p className="truncate-text">{text}</p>,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Hành động</span>
      ),
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Sửa">
            <Button
              color="primary"
              variant="filled"
              size="Large"
              style={{ fontSize: "20px", padding: "20px 20px" }}
              icon={<EditOutlined />}
              onClick={() => handleEditClick(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa phim này?"
              onConfirm={() => handleDelete(record.maPhim)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                color="danger"
                variant="filled"
                size="Large"
                style={{ fontSize: "20px", padding: "20px 20px" }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>

          <Tooltip title="Lịch chiếu">
            <Button
              color="cyan"
              variant="filled"
              size="Large"
              style={{ fontSize: "20px", padding: "20px 20px" }}
              icon={<CalendarOutlined />}
              onClick={() => handleShowtimesClick(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (loading) return <Skeleton active />;

  if (error) {
    return <Alert message="Lỗi khi tải danh sách phim" type="error" />;
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Quản lý Phim</h1>
      <Button
        color="primary"
        variant="outlined"
        icon={<PlusOutlined />}
        className="mb-4 py-4 px-3"
        onClick={handleAddMovie}
      >
        Thêm phim
      </Button>
      <Input.Search
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        allowClear
        size="large"
        style={{
          width: "100%",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "12px",
          display: "flex",
        }}
      />
      <Table columns={columns} dataSource={filteredMovies} rowKey="maPhim" />
      <ToastContainer />
    </div>
  );
}
