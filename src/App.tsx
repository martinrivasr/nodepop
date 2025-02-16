import {Routes, Route, Link } from "react-router-dom";
import Navbar from "./containers/Header/Navbar";
import AdvertsPage from "./pages/AdvertsPage";
import SignupPage from "./pages/SignupPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFoundPage from "./pages/NotFoundPage"
import AdvertDetailPage from "./pages/AdvertDetailPage"
import RequireAuth from "./auth/requireAuth";
import { AuthProvider} from "./auth/autoProvider"
import { lazy, Suspense, useState } from "react"
import ErrorBoundary from "./components/ErrorBoundary";


const LoginPage = lazy(() => import("./pages/LoginPage"))

function App() {

  return (
    <ErrorBoundary>
        <AuthProvider defaultIsLogged={false}>
          <Navbar /> 
          <Routes>
            <Route 
              path="/login" 
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LoginPage />
                </Suspense>
              } 
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/adverts" element={<AdvertsPage />} />
            <Route path="/adverts/:id" element={<AdvertDetailPage />} />
            <Route 
              path="/adverts/new" 
              element={
                <RequireAuth>
                  <NewAdvertPage />
                </RequireAuth>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;