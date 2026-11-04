import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-10 text-center">Checking your login...</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (adminOnly && user.role !== "admin") {
    return <main className="mx-auto max-w-xl p-12 text-center"><h1 className="text-3xl font-bold text-red-700">403 — Access Denied</h1><p className="mt-4 text-slate-700">Only administrators can access this page.</p></main>;
  }
  return children;
}
export default ProtectedRoute;
