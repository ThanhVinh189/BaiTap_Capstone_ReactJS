import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "./slice";
import { useEffect } from "react";
import dayjs from "dayjs";
import { Spin, Tabs } from "antd";
import { FaStar } from "react-icons/fa";

export default function DetailMoviePage() {
  const state = useSelector((state) => state.detailMovieReducer);
  const { data } = state;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, [id, dispatch]);

  if (state.loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  return (
    <div
      style={{
        backgroundImage: 'url("https://i.ibb.co/Ybnw70Q/homeappbg.jpg")',
      }}
      className="flex flex-col items-center justify-center -mt-[80px] relative z-10 pt-24 pb-20 bg-cover bg-no-repeat min-h-screen"
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg flex space-x-6 items-center justify-start w-2/4">
        <div className="flex-shrink-0">
          {data && (
            <img
              className="rounded-lg w-60 h-auto object-cover"
              src={data.hinhAnh}
              alt={data.tenPhim}
            />
          )}
        </div>
        <div className="text-white max-w-lg">
          {data && (
            <>
              <h2 className="text-3xl font-bold text-orange-400 mb-4">
                {data.tenPhim}
              </h2>
              <p className="mb-2 text-sm text-gray-300">
                Ngày phát hành: {dayjs(data.ngayKhoiChieu).format("DD-MM-YYYY")}
              </p>
              <p className="mb-2 text-sm text-yellow-400 flex items-center">
                Đánh giá:
                <span className="flex items-center ml-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        color={
                          ratingValue <= Math.round(data.danhGia / 2)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        className="mr-1"
                      />
                    );
                  })}
                  <span className="ml-2 text-sm text-gray-300">
                    ({data.danhGia}/10)
                  </span>
                </span>
              </p>
              <p className="text-gray-300">{data.moTa}</p>
            </>
          )}
        </div>
      </div>

      <div className="bg-black bg-opacity-70 p-8 rounded-lg mt-6 text-white w-3/4">
        <h3 className="text-2xl font-bold text-lime-600 mb-4 text-left">
          Lịch Chiếu
        </h3>
        <Tabs
          tabPosition="left"
          items={data?.heThongRapChieu?.map((heThongRap) => ({
            label: (
              <div className="text-center">
                <img
                  src={heThongRap.logo}
                  alt={heThongRap.tenHeThongRap}
                  className="w-16 h-16 object-cover mx-auto mb-2"
                />
              </div>
            ),
            key: heThongRap.maHeThongRap,
            children: (
              <div className="p-4">
                {heThongRap.cumRapChieu.map((cumRap) => (
                  <div
                    key={cumRap.maCumRap}
                    className="mb-6 border-b pb-4 flex items-center"
                  >
                    <img
                      src={cumRap.hinhAnh}
                      alt={cumRap.tenCumRap}
                      className="w-20 h-20 object-cover rounded-md mb-2 mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400">
                        {cumRap.tenCumRap}
                      </h3>
                      <p className="text-sm text-gray-400">{cumRap.diaChi}</p>
                      <div className="mt-2">
                        {cumRap.lichChieuPhim.map((lichChieu) => (
                          <span
                            key={lichChieu.maLichChieu}
                            className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer hover:bg-green-200 transition"
                            onClick={() =>
                              navigate(`/dat-ve/${lichChieu.maLichChieu}`)
                            }
                          >
                            {dayjs(lichChieu.ngayChieuGioChieu).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
}
