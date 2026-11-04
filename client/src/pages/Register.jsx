import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await registerUser(form);
      navigate("/login", { state: { message: "Account created. Please log in." } });
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-sm text-slate-600">New registrations receive the normal user role.</p>
        <label className="block font-medium">Name<input required maxLength={80} autoComplete="name" className="mt-1 w-full rounded border p-3" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))}/></label>
        <label className="block font-medium">Email<input required type="email" autoComplete="email" className="mt-1 w-full rounded border p-3" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))}/></label>
        <label className="block font-medium">Password<input required type="password" minLength={8} autoComplete="new-password" className="mt-1 w-full rounded border p-3" value={form.password} onChange={e => setForm(f => ({...f,password:e.target.value}))}/></label>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded bg-blue-600 px-4 py-3 font-bold text-white disabled:opacity-60">{busy ? "Registering..." : "Register"}</button>
        <p className="text-center text-sm">Already registered? <Link className="text-blue-700 underline" to="/login">Login</Link></p>
      </form>
    </main>
  );
}
export default Register;
