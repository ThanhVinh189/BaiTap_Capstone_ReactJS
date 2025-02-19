import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Carousel, Tabs } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import MovieList from "./Movie";
import { fetchListMovie } from "./slice";

export default function ListMoviePage() {
  const state = useSelector((state) => state.listMovieReducer);
  const dispatch = useDispatch();

  // Tạo ref cho từng tab
  const nowShowingRef = useRef(null);
  const comingSoonRef = useRef(null);

  // Quản lý tab đang chọn
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  const renderMovieSlide = (movies) => {
    const chunks = [];
    for (let i = 0; i < movies.length; i += 4) {
      chunks.push(movies.slice(i, i + 4));
    }

    return chunks.map((chunk, index) => (
      <div key={index}>
        <div className="grid grid-cols-4 gap-2 place-items-center">
          {chunk.map((movie) => (
            <MovieList key={movie.maPhim} movie={movie} />
          ))}
        </div>
      </div>
    ));
  };

  const renderMovieByStatus = (status) => {
    const { data } = state;
    const movies = data?.filter((movie) => movie[status]);
    const isNowShowing = status === "dangChieu";

    return (
      <div className="relative">
        {/* Nút mũi tên trái */}
        <button
          className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
          onClick={() =>
            isNowShowing
              ? nowShowingRef.current.prev()
              : comingSoonRef.current.prev()
          }
        >
          <LeftOutlined style={{ color: "white", fontSize: "24px" }} />
        </button>

        {/* Carousel */}
        <Carousel
          ref={isNowShowing ? nowShowingRef : comingSoonRef}
          dots={false}
          slidesToShow={1}
          slidesToScroll={1}
          speed={500}
          key={activeTab}
        >
          {renderMovieSlide(movies)}
        </Carousel>

        {/* Nút mũi tên phải */}
        <button
          className="absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
          onClick={() =>
            isNowShowing
              ? nowShowingRef.current.next()
              : comingSoonRef.current.next()
          }
        >
          <RightOutlined style={{ color: "white", fontSize: "24px" }} />
        </button>
      </div>
    );
  };

  if (state.loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  const items = [
    {
      key: "1",
      label: <span className="font-bold text-lg">Đang Chiếu</span>,
      children: renderMovieByStatus("dangChieu"),
    },
    {
      key: "2",
      label: <span className="font-bold text-lg">Sắp Chiếu</span>,
      children: renderMovieByStatus("sapChieu"),
    },
  ];

  return (
    <div className="container mt-[-80px] mb-10">
      <h1 className="font-semibold text-2xl pb-5 text-left">Danh Sách Phim</h1>
      <Tabs
        defaultActiveKey="1"
        centered
        animated
        items={items}
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
}
