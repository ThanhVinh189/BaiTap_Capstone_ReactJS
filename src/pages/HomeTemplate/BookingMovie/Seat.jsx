import { useMemo, memo, useCallback } from "react";
import { setSeatSelected } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function Seat({ seat }) {
  const dispatch = useDispatch();
  const { listSeatsSelected } = useSelector(
    (state) => state.bookingTicketReducer
  );


  const isChoosing = useMemo(
    () => listSeatsSelected.some((item) => item.maGhe === seat.maGhe),
    [listSeatsSelected, seat.maGhe]
  );


  const handleSeatClick = useCallback(() => {
    dispatch(setSeatSelected(seat));
  }, [dispatch, seat]);

  return (
    <button
      onClick={handleSeatClick}
      disabled={seat.daDat}
      aria-label={`Ghế số ${seat.tenGhe} ${seat.daDat ? "đã đặt" : "chưa đặt"}`}
      className={`w-10 h-9 m-1 text-white font-bold rounded-md transition-all duration-300 ${
        seat.daDat
          ? "bg-gray-400 cursor-not-allowed"
          : isChoosing
          ? "bg-green-500 hover:bg-green-600"
          : seat.loaiGhe === "Vip"
          ? "bg-yellow-500 hover:bg-yellow-600" 
          : "bg-blue-500 hover:bg-blue-600" 
      }`}
    >
      {seat.tenGhe}
    </button>
  );
}

Seat.propTypes = {
  seat: PropTypes.shape({
    maGhe: PropTypes.number.isRequired,
    tenGhe: PropTypes.string.isRequired,
    loaiGhe: PropTypes.string.isRequired,
    daDat: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(Seat);
