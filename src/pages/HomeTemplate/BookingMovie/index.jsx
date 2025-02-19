import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListSeats, removeSeatSelected, datVe } from "./slice";
import Seat from "./Seat";
import { Button, Modal } from "antd";

export default function BookingMovie() {
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    listSeats,
    listSeatsSelected,
    movieDetail,
    isBookingSuccess,
    loading,
    error,
  } = useSelector((state) => state.bookingTicketReducer);

  useEffect(() => {
    if (maLichChieu) {
      dispatch(fetchListSeats(maLichChieu));
    } else {
      console.warn("Không có maLichChieu trong URL!");
    }
  }, [dispatch, maLichChieu]);

  useEffect(() => {
    if (isBookingSuccess) {
      setIsModalOpen(false);
    }
  }, [isBookingSuccess]);

  const renderListSeat = () => {
    if (!listSeats || listSeats.length === 0)
      return <p className="text-white">Không có dữ liệu ghế!</p>;

    const rows = [];
    for (let i = 0; i < listSeats.length; i += 16) {
      rows.push(listSeats.slice(i, i + 16));
    }

    return (
      <div className="flex flex-col items-center space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-2">
            {row.map((seat) => (
              <Seat key={seat.maGhe} seat={seat} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleRemoveSeat = (maGhe) => {
    dispatch(removeSeatSelected(maGhe));
  };

  const totalPrice = () => {
    return listSeatsSelected.reduce((total, seat) => (total += seat.giaVe), 0);
  };

  if (loading)
    return (
      <div className="min-h-screen -mt-[80px] relative z-10 flex justify-center items-center bg-gray-900">
        <div className="w-3/5 space-y-4">
          {/* Skeleton Poster */}
          <div className="flex space-x-4">
            <div className="w-32 h-48 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-5 bg-gray-700 rounded animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/3"></div>
            </div>
          </div>

          {/* Skeleton Ghế */}
          <div className="w-full border rounded border-gray-500 p-5 bg-black/50 space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4"></div>
            <div className="grid grid-cols-8 gap-2 mt-4">
              {Array.from({ length: 64 }).map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gray-700 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  if (error) return <div className="text-white">Lỗi: {error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center -mt-[80px] relative z-10"
      style={{
        backgroundImage: 'url("https://i.ibb.co/Ybnw70Q/homeappbg.jpg")',
      }}
    >
      <div className="container mx-auto py-5 backdrop-blur-md bg-black/10 min-h-screen">
        {/* 🔥 Thông Tin Phim */}
        <div className="text-white flex mb-5">
          <img
            src={movieDetail?.hinhAnh}
            alt={movieDetail?.tenPhim}
            className="w-48 h-full object-cover rounded-md shadow-md ml-4"
          />
          <div className="ml-5">
            <h2 className="text-4xl font-bold text-orange-500">
              {movieDetail?.tenPhim}
            </h2>
            <p className="text-2xl font-semibold text-green-500">
              {movieDetail?.tenCumRap}
            </p>
            <p className="text-lg">{movieDetail?.diaChi}</p>
            <p className="text-lg">Thời Lượng: 120 phút</p>
            <p className="text-lg">Ngày Chiếu: {movieDetail?.ngayChieu}</p>
            <p className="text-lg">Giờ Chiếu: {movieDetail?.gioChieu}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4 border rounded border-gray-500 p-5 bg-black/50">
            {/* 🔥 Thông tin trên cùng */}
            <div className="text-white mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Số Phòng Chiếu:</h2>
                <h1 className="text-4xl font-bold">{movieDetail?.tenRap}</h1>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 border rounded-md bg-blue-500"></div>
                  <span>Ghế Thường</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 border rounded-md bg-yellow-500"></div>
                  <span>Ghế VIP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 border rounded-md bg-green-500"></div>
                  <span>Đang Chọn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 border rounded-md bg-gray-600"></div>
                  <span>Đã Đặt</span>
                </div>
              </div>
            </div>

            {/* 🔥 SCREEN ở trên cùng */}
            <div className="mt-5 text-center text-white">
              <div className="bg-gray-800 h-4 w-full mx-auto rounded-t-xl shadow-lg"></div>
              <p className="text-xl font-bold mt-2">MÀN HÌNH</p>
            </div>

            {renderListSeat()}
          </div>
          <div className="w-1/4 text-center ml-2 border rounded border-gray-500 p-5 bg-black/50 text-white">
            <h1 className="text-2xl font-bold mb-3">
              Danh Sách Ghế Đang Chọn:
            </h1>
            <div className="space-y-2">
              {listSeatsSelected.map((seat) => (
                <div
                  key={seat.maGhe}
                  className="flex justify-between items-center bg-gray-800 p-2 rounded"
                >
                  <span className="inline-flex items-center justify-center font-semibold border border-transparent bg-green-500 w-9 h-9 rounded-md text-white shadow-md">
                    {seat.tenGhe}
                  </span>

                  <div>
                    <span className="text-lg font-semibold">
                      {seat.giaVe.toLocaleString()} VNĐ
                    </span>
                    <button
                      onClick={() => handleRemoveSeat(seat.maGhe)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="mt-3 text-xl font-bold text-yellow-400">
              ~Tạm Tính: {totalPrice().toLocaleString()} VNĐ~
            </div>
            <div className="mt-5">
              <Button
                type="primary"
                size="large"
                block
                onClick={() => setIsModalOpen(true)}
                disabled={listSeatsSelected.length === 0}
                style={{
                  backgroundColor: listSeatsSelected.length
                    ? "#722ed1"
                    : "#d9d9d9",
                  color: listSeatsSelected.length ? "#fff" : "#888",
                  borderColor: listSeatsSelected.length ? "#722ed1" : "#d9d9d9",
                  cursor: listSeatsSelected.length ? "pointer" : "not-allowed",
                }}
              >
                Thanh Toán
              </Button>
              <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={500}
              >
                <div className="p-2">
                  <h2 className="text-xl font-bold mb-4 text-green-500">
                    Vé Của Bạn
                  </h2>
                  <div className="flex">
                    <img
                      src={movieDetail?.hinhAnh}
                      alt={movieDetail?.tenPhim}
                      className="w-28 h-48 object-cover rounded-md shadow-md"
                    />
                    <div className="ml-4 flex-1 mt-20">
                      <h3 className="text-3xl font-bold">
                        {movieDetail?.tenPhim}
                      </h3>
                      <p>{movieDetail?.ngayChieu}</p>
                      <p className="text-lg font-semibold">
                        {movieDetail?.gioChieu}
                      </p>
                    </div>
                  </div>

                  {/* Thông tin rạp và Theater No */}
                  <div className="flex mt-4 p-3 border rounded-lg shadow-sm bg-gray-50">
                    <div className="w-2/3">
                      <h4 className="text-xl font-bold">
                        {movieDetail?.tenCumRap}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {movieDetail?.diaChi}
                      </span>
                    </div>
                    <div className="text-right w-1/3">
                      <p>Số Phòng Chiếu:</p>
                      <span className="text-2xl font-bold text-purple-700">
                        Rạp 10
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <p className="font-semibold">Ghế đã chọn:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {listSeatsSelected.length > 0 ? (
                        listSeatsSelected.map((seat) => (
                          <span
                            key={seat.maGhe}
                            className="inline-flex items-center justify-center font-semibold text-lg text-green-600"
                          >
                            {seat.tenGhe}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">Chưa chọn ghế nào.</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-2">
                    <p className="font-semibold">Tổng tiền:</p>
                    <p className="text-lg font-bold text-orange-700">
                      {totalPrice().toLocaleString()} VNĐ
                    </p>
                  </div>

                  <Button
                    type="primary"
                    className="mt-5 w-full h-10 bg-purple-600 hover:bg-purple-700 border-none"
                    onClick={() => {
                      const thongTinDatVe = {
                        maLichChieu: maLichChieu,
                        danhSachVe: listSeatsSelected.map((seat) => ({
                          maGhe: seat.maGhe,
                          giaVe: seat.giaVe,
                        })),
                      };

                      dispatch(datVe(thongTinDatVe));
                    }}
                  >
                    Đặt Ngay
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
