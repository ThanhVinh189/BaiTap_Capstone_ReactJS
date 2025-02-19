import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeThongRap, fetchLichChieuRap } from "./slice";

export default function TabMovie() {
  const dispatch = useDispatch();
  const { heThongRap, lichChieu, loading } = useSelector(
    (state) => state.tabMovieReducer || {}
  );

  const [selectedHeThongRap, setSelectedHeThongRap] = useState(null);
  const [selectedCumRap, setSelectedCumRap] = useState(null);
  const [selectedPhim, setSelectedPhim] = useState(null);

  useEffect(() => {
    dispatch(fetchHeThongRap());
  }, [dispatch]);

  useEffect(() => {
    if (heThongRap.length > 0 && !selectedHeThongRap) {
      const firstHeThong = heThongRap[0].maHeThongRap;
      setSelectedHeThongRap(firstHeThong);
      dispatch(fetchLichChieuRap(firstHeThong));
    }
  }, [heThongRap, selectedHeThongRap, dispatch]);

  useEffect(() => {
    if (
      selectedHeThongRap &&
      lichChieu[selectedHeThongRap]?.lstCumRap?.length
    ) {
      const firstCumRap = lichChieu[selectedHeThongRap].lstCumRap[0].maCumRap;
      setSelectedCumRap(firstCumRap);
    }
  }, [selectedHeThongRap, lichChieu]);

  useEffect(() => {
    if (selectedCumRap) {
      const phimList = lichChieu[selectedHeThongRap]?.lstCumRap?.find(
        (cum) => cum.maCumRap === selectedCumRap
      )?.danhSachPhim;

      if (phimList?.length) {
        setSelectedPhim(phimList[0].maPhim);
      }
    }
  }, [selectedCumRap, selectedHeThongRap, lichChieu]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-32">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <div className="w-[80%] mx-auto mb-5">
        <h1 className="text-3xl font-bold text-left">Danh sách rạp</h1>
      </div>
      <div className="w-[80%] bg-white shadow-xl rounded-lg p-5 mx-auto flex mb-20 mt-5">
        {/* Cột 1: Logo hệ thống rạp */}
        <div className="w-[100px] flex-shrink-0 overflow-y-auto max-h-[500px] border-r my-2">
          {heThongRap.map((rap) => (
            <div
              key={rap.maHeThongRap}
              className="p-2 cursor-pointer flex items-center relative"
              onClick={() => {
                setSelectedHeThongRap(rap.maHeThongRap);
                dispatch(fetchLichChieuRap(rap.maHeThongRap));
              }}
            >
              <img
                src={rap.logo}
                alt={rap.tenHeThongRap}
                className="w-16 h-16"
              />
              {/* Thanh xanh bên phải */}
              {selectedHeThongRap === rap.maHeThongRap && (
                <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 transition-all duration-500"></div>
              )}
            </div>
          ))}
        </div>

        {/* Cột 2: Danh sách cụm rạp */}
        <div className="w-[500px] overflow-y-auto max-h-[500px] border-r scrollbar-none">
          {lichChieu[selectedHeThongRap]?.lstCumRap?.map((cum) => (
            <div
              key={cum.maCumRap}
              className="p-2 cursor-pointer flex items-start mb-4 relative transition-all duration-300 "
              onClick={() => setSelectedCumRap(cum.maCumRap)}
            >
              {/* 🔹 Logo của hệ thống rạp */}
              <img
                src={
                  heThongRap.find(
                    (htr) => htr.maHeThongRap === selectedHeThongRap
                  )?.logo
                }
                alt="logo"
                className="w-12 h-12 object-cover rounded-md mr-3"
              />
              {/* 🔹 Tên và địa chỉ cụm rạp */}
              <div>
                <h1 className="text-green-500 text-lg font-bold">
                  {cum.tenCumRap}
                </h1>
                <p
                  className={`font-semibold transition-all duration-300 ${
                    selectedCumRap === cum.maCumRap
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {cum.diaChi}
                </p>
              </div>
              {selectedCumRap === cum.maCumRap && (
                <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 transition-all duration-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Cột 3: Danh sách phim */}
        <div className="w-[300px] overflow-y-auto max-h-[500px] border-r scrollbar-none">
          {lichChieu[selectedHeThongRap]?.lstCumRap
            ?.find((cum) => cum.maCumRap === selectedCumRap)
            ?.danhSachPhim?.map((phim) => (
              <div
                key={phim.maPhim}
                className={`flex p-2 cursor-pointer relative ${
                  selectedPhim === phim.maPhim ? "font-bold" : ""
                }`}
                onClick={() => setSelectedPhim(phim.maPhim)}
              >
                <img
                  src={phim.hinhAnh}
                  alt={phim.tenPhim}
                  className="w-16 h-24 rounded-md object-cover mr-3"
                />
                <h3>{phim.tenPhim}</h3>
                {/* Thanh xanh bên phải */}
                {selectedPhim === phim.maPhim && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-blue-500 transition-all duration-500"></div>
                )}
              </div>
            ))}
        </div>

        {/* Cột 4: Lịch chiếu */}
        <div className="w-[450px] overflow-y-auto max-h-[500px] pr-2 scrollbar-none">
          {(() => {
            const selectedMovie = lichChieu[selectedHeThongRap]?.lstCumRap
              ?.find((cum) => cum.maCumRap === selectedCumRap)
              ?.danhSachPhim?.find((phim) => phim.maPhim === selectedPhim);

            if (!selectedMovie || !selectedMovie.lstLichChieuTheoPhim)
              return <p>Không có lịch chiếu</p>;

            // 🔹 Nhóm lịch chiếu theo ngày
            const groupedByDate = selectedMovie.lstLichChieuTheoPhim.reduce(
              (acc, lich) => {
                const date = new Date(
                  lich.ngayChieuGioChieu
                ).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                }); // ✅ Chỉ lấy ngày & tháng (bỏ năm)
                if (!acc[date]) acc[date] = [];
                acc[date].push(lich);
                return acc;
              },
              {}
            );

            return Object.entries(groupedByDate).map(([date, times]) => (
              <div key={date} className="p-2 border-b">
                <p className="text-sm font-semibold text-gray-700">{date}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {times.map((lich) => {
                    const formattedTime = new Date(
                      lich.ngayChieuGioChieu
                    ).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <button
                        key={lich.maLichChieu}
                        className="px-3 py-1 text-green-600 border rounded hover:bg-green-100"
                      >
                        {formattedTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </>
  );
}
