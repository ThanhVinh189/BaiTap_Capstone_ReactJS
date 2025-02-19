import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers, deleteUser } from "./slice";
import {
  Table,
  Tag,
  Button,
  Typography,
  Popconfirm,
  message,
  Input,
  Spin,
} from "antd";

export default function UsersPage() {
  const state = useSelector((state) => state.listUsersReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchListUsers(searchKeyword));
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchKeyword, dispatch]);

  const handleSearch = () => {
    dispatch(fetchListUsers(searchKeyword));
  };

  const handleEdit = (record) => {
    message.info(`Bạn đã chọn chỉnh sửa tài khoản: ${record.taiKhoan}`);
    navigate(`/admin/update-user/${record.taiKhoan}`);
  };

  const handleDelete = (taiKhoan) => {
    dispatch(deleteUser(taiKhoan))
      .unwrap()
      .then(() => {
        message.success("Xóa người dùng thành công!");
      })
      .catch((error) => {
        message.error("Xóa người dùng thất bại! " + error);
      });
  };

  const handleAddUser = () => {
    navigate("/admin/add-user"); // Điều hướng đến trang thêm người dùng
  };

  const columns = [
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Tài khoản</span>
      ),
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Họ tên</span>
      ),
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Email</span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: <span style={{ fontWeight: "bold", fontSize: "18px" }}>SĐT</span>,
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
          Loại người dùng
        </span>
      ),
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => (
        <Tag color={maLoaiNguoiDung === "KhachHang" ? "green" : "red"}>
          {maLoaiNguoiDung}
        </Tag>
      ),
      filters: [
        {
          text: "Khách Hàng",
          value: "KhachHang",
        },
        {
          text: "Quản Trị",
          value: "QuanTri",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung === value,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Action</span>
      ),
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="mr-2"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa tài khoản này không?"
            onConfirm={() => handleDelete(record.taiKhoan)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button color="default" variant="solid">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (state.loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="p-2">
      <Typography.Title level={2} className="text-center">
        Users Page
      </Typography.Title>
      <div className="mb-2">
        <Button
          color="primary"
          variant="solid"
          className="mb-4 py-4 px-3"
          size="large"
          type="primary"
          onClick={handleAddUser}
        >
          Thêm người dùng
        </Button>
      </div>
      <div className="mb-4">
        <Input.Search
          placeholder="Nhập tài khoản hoặc họ tên người dùng"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          enterButton="Tìm"
          onSearch={handleSearch}
          allowClear
          size="large"
          style={{
            width: "100%",
            height: "40px", // Tăng chiều cao của hộp tìm kiếm
            borderRadius: "4px",
            fontSize: "16px", // Tăng kích thước chữ
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={state.data}
        rowKey="taiKhoan"
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
