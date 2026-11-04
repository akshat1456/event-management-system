import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getAdminOverview } from "../services/authApi";

function AdminDashboard() {
  const { token } = useAuth();
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    getAdminOverview(token, controller.signal)
      .then(data => { if (!controller.signal.aborted) setOverview(data); })
      .catch(err => { if (!controller.signal.aborted) setError(err.message); });
    return () => controller.abort();
  }, [token]);
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-5 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Protected by a verified JWT and administrator role.</p>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {!overview && !error && <p>Loading admin overview...</p>}
        {overview && <div className="rounded-lg bg-green-50 p-6 text-green-800">
          <p className="text-xl font-bold">{overview.message}</p>
          <p className="mt-2">Administrator: {overview.admin.name}</p>
          <p>Total registered users: {overview.totalUsers}</p>
          <p>Total events in MongoDB: {overview.totalEvents}</p>
        </div>}
      </div>
    </main>
  );
}
export default AdminDashboard;
