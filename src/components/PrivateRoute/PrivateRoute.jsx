import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/useAuth";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to view this page!");
    }
  }, [loading, user]);

  if (loading) {
    return null; 
  }

  return user ? children : <Navigate to={redirectTo} replace />;
}