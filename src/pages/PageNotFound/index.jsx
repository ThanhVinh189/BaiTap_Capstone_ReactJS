import Header from "../HomeTemplate/_component/Header";
import Footer from "../HomeTemplate/_component/Footer";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="relative flex flex-col items-center justify-center ">
        <img
          className="w-full max-w-lg mx-auto object-cover"
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Not Found"
        />
        <h2 className="uppercase text-2xl md:text-3xl font-bold text-center text-red-600">
          Không tìm thấy trang 404
        </h2>
        <p className="mt- text-center text-lg">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
        <button
          className="my-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </button>
      </div>
      <Footer />
    </>
  );
}
