import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage/HomePage";
import TeachersPage from "./Pages/TeachersPage/TeachersPage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {Toaster} from "react-hot-toast";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 1500,
          style: {
            background: "#ffffff",
            color: "#121417",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }} 
      />
    </>
  );
}   