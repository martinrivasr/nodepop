import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./containers/Header/Navbar";
import AdvertsPage from "./containers/AdvertsPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AdvertsPage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
