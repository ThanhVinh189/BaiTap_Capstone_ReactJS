import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

Modal.setAppElement("#root");

export default function Movie({ movie }) {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="relative w-[250px] min-w-xs my-5 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* Ảnh Poster */}
        <img
          className="w-full h-[370px] object-cover"
          src={movie.hinhAnh}
          alt={`Poster của phim ${movie.tenPhim}`}
        />

        {/* Tên phim */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white font-bold p-3 text-center">
          {movie.tenPhim}
        </div>

        {/* Nút Trailer */}
        <button
          onClick={openModal}
          className={`absolute inset-0 bottom-16 flex justify-center items-center text-orange-400 text-6xl transition-opacity duration-300 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
          aria-label={`Xem trailer phim ${movie.tenPhim}`}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
        </button>

        {/* Nút Xem chi tiết và Đặt vé */}
        <div
          className={`absolute bottom-16 left-0 right-0 flex justify-center space-x-4 p-4 transition-opacity duration-300 ${
            isHover ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link to={`/detail/${movie.maPhim}`}>
            <Button color="primary" variant="solid" size="large">
              Xem chi tiết
            </Button>
          </Link>
          <Link to={movie.maLichChieu ? `/dat-ve/${movie.maLichChieu}` : "#"}>
            <Button
              color="purple"
              variant="solid"
              size="large"
              disabled={!movie.maLichChieu}
              style={{
                backgroundColor: movie.maLichChieu ? "#722ed1" : "#d9d9d9",
                color: movie.maLichChieu ? "#fff" : "#888",
                cursor: movie.maLichChieu ? "pointer" : "not-allowed",
                boxShadow: "none",
              }}
            >
              {movie.maLichChieu ? "Đặt vé" : "Đã hết vé"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal phát trailer */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="relative w-full max-w-3xl">
          {/* Nút đóng */}
          <button
            onClick={closeModal}
            className="absolute -top-8 -right-8 text-white text-3xl focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {/* Video YouTube */}
          <iframe
            className="w-full h-[500px] rounded-lg"
            src={`https://www.youtube.com/embed/${
              movie.trailer.match(
                /(?:v=|\/embed\/|\/1\/|\/v\/|youtu\.be\/|\/e\/|watch\?v=|watch\?.+&v=)([^&\n?#]+)/
              )[1]
            }`}
            title={`Trailer của phim ${movie.tenPhim}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </>
  );
}

Movie.propTypes = {
  movie: PropTypes.shape({
    maPhim: PropTypes.number.isRequired,
    tenPhim: PropTypes.string.isRequired,
    hinhAnh: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
    maLichChieu: PropTypes.string,
  }).isRequired,
};
