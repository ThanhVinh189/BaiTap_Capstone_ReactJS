import { Carousel } from "antd";
import { useEffect } from "react";
import { fetchCarousel } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

export default function CarouselHome() {
  const { banners, loading } = useSelector((state) => state.carouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarousel());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="w-full -mt-[80px] relative z-10">
      <Carousel autoplay dots={{ className: "custom-dots" }}>
        {banners.map((banner) => (
          <div key={banner.maBanner} className="h-full">
            <img
              src={banner.hinhAnh}
              alt="banner"
              className="w-full h-[600px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
