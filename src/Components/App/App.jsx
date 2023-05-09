import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons";

import { MainPage } from "../../pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
