import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
}

export default App;
