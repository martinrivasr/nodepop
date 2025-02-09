import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./containers/Header/Navbar";
import AdvertsPage from "./pages/AdvertsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import AdvertDetailPage from "./pages/AdvertDetailPage"
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/adverts"
            element={
              <PrivateRoute>
                <AdvertsPage />
              </PrivateRoute>
            }
          />
          <Route path="/new-advert" element={<NewAdvertPage/>}>
          </Route>
          <Route
          path="/adverts/:id"
          element={
              <PrivateRoute>
                <AdvertDetailPage/>
              </PrivateRoute>  
          }
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;