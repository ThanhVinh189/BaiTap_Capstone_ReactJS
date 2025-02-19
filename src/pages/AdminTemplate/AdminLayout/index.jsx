import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  CalendarOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Thêm dòng này
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoTen, setHoTen] = useState("Admin");
  const navigate = useNavigate();
  const location = useLocation(); // Lấy URL hiện tại

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.hoTen) {
      setHoTen(userInfo.hoTen);
    }
  }, []);

  const handleMenuClick = (e) => {
    if (e.key.startsWith("/admin")) {
      navigate(e.key);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000); // Chờ 2 giây rồi reload trang
  };

  const userMenuItems = [
    {
      key: "info",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
      onClick: () => navigate("/admin/thong-tin-ca-nhan"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          collapsedWidth={80}
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
          }}
        >
          <div
            className="logo"
            style={{ color: "white", textAlign: "center", padding: "10px 0" }}
          >
            {!collapsed ? "CINEMA" : "CN"}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            items={[
              {
                key: "movies",
                icon: <VideoCameraOutlined />,
                label: "Movies",
                children: [
                  {
                    key: "/admin/movie-list",
                    icon: <FundProjectionScreenOutlined />,
                    label: "List Movies",
                  },
                  {
                    key: "/admin/add-movie",
                    icon: <UploadOutlined />,
                    label: "Add New Movie",
                  },
                ],
              },
              {
                key: "users",
                icon: <UserOutlined />,
                label: "Users",
                children: [
                  {
                    key: "/admin/users",
                    icon: <UserSwitchOutlined />,
                    label: "User List",
                  },
                  {
                    key: "/admin/add-user",
                    icon: <UserAddOutlined />,
                    label: "Add User",
                  },
                ],
              },
              {
                key: "/",
                icon: <CalendarOutlined />,
                label: "Show Time",
              },
            ]}
          />
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 250,
            transition: "all 0.2s",
          }}
        >
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              width: "100%",
              padding: "0 20px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
                <span>{hoTen}</span>
              </Space>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 15,
              minHeight: "calc(100vh - 64px - 48px)", // Trừ chiều cao của Header và khoảng cách
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>

      <ToastContainer />
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
