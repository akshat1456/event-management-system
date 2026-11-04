import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const user = await login(form);
      navigate(location.state?.from || (user.role === "admin" ? "/admin" : "/events"), { replace: true });
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Login</h1>
        {location.state?.message && <p className="text-green-700">{location.state.message}</p>}
        <label className="block font-medium">Email<input required type="email" autoComplete="username" className="mt-1 w-full rounded border p-3" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))}/></label>
        <label className="block font-medium">Password<input required type="password" autoComplete="current-password" className="mt-1 w-full rounded border p-3" value={form.password} onChange={e => setForm(f => ({...f,password:e.target.value}))}/></label>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-60">{busy ? "Logging in..." : "Login"}</button>
        <p className="text-center text-sm">New user? <Link className="text-blue-700 underline" to="/register">Register</Link></p>
      </form>
    </main>
  );
}
export default Login;
