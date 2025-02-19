import CarouselHome from "../CarouselHome";
import ListMoviePage from "../ListMoviePage";
import TabMovie from "../TabMovie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePgae() {
  return (
    <div>
      <CarouselHome />
      <div className="py-5">
        <div className="title">
          <span>Khám Phá Ngay</span>
          <h2>THẾ GIỚI ĐIỆN ẢNH</h2>
          <p>
            Những bộ phim đang chiếu và sắp ra mắt dưới đây chắc chắn sẽ khiến
            bạn háo hức mong chờ!
          </p>
        </div>
      </div>
      <ListMoviePage />
      
      <TabMovie />
      <ToastContainer />
    </div>
  );
}
