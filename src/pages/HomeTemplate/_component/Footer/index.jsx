export default function Footer() {
  return (
    <footer className="w-full mx-auto px-4 bg-gray-900 text-white">
      <div className="py-8 w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1 hidden md:block">
            <p className="text-lg text-gray-100 font-semibold py-2">CINEMA</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Brand Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 hidden md:block">
            <p className="text-lg font-semibold py-2">Thông Tin</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Thoả thuận sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <p className="text-lg font-semibold py-2">Đối Tác</p>
            <div className="grid grid-cols-3 gap-3">
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
                className="w-10 h-10 bg-white rounded-full"
              />
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/cgv.png"
                className="w-10 h-10 bg-white rounded-full"
              />
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png"
                className="w-10 h-10 bg-white rounded-full"
              />
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png"
                className="w-10 h-10 bg-white rounded-full"
              />
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png"
                className="w-10 h-10 bg-white rounded-full"
              />
              <img
                src="https://movienew.cybersoft.edu.vn/hinhanh/megags.png"
                className="w-10 h-10 bg-white rounded-full"
              />
            </div>
          </div>
          <div className="col-span-1 text-right">
            <p className="text-lg font-semibold py-2">MOBILE APP</p>
            <div className="flex justify-end space-x-2">
              <img
                src="https://i.ibb.co/Zm8vZgX/apple-logo.png"
                className="w-10 h-10"
              />
              <img
                src="https://i.ibb.co/m6YfCrT/android-logo.png"
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <img
              src="./images/film.png"
              className="w-16 h-16 rounded-full bg-white"
            />
            <span className="text-2xl font-bold text-orange-400">CINEMA</span>
          </div>
          <div className="text-center md:text-left">
            <p className="font-semibold text-white">
              CINEMA – DỰ ÁN ĐẶT VÉ XEM PHIM
            </p>
            <p>Số Điện Thoại (Hotline): 1900 000 222</p>
            <p>
              Email:{" "}
              <a href="#" className="text-blue-400">
                support@info.vn
              </a>
            </p>
          </div>
          <div>
            <img
              src="https://file.hstatic.net/1000012850/file/thong-bao-website-voi-bo-cong-thuong_grande.png"
              className="w-auto h-16"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
