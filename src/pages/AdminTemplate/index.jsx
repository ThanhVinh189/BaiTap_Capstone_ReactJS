import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import DashboardPage from "./AdminLayout";

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
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
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!data) {
    return <Navigate to="/auth" />;
  }

  return (
    <DashboardPage to="/admin/movie-list">
      <Outlet />
      <ToastContainer />
    </DashboardPage>
  );
}
