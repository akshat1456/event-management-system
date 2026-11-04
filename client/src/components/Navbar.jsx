import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import NotificationBell from "./NotificationBell";

const navClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-slate-700 text-white" : "text-slate-200 hover:bg-slate-700"}`;
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function signOut() { logout(); navigate("/login"); }
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link to="/" className="text-2xl font-bold">EventHub</Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/events" className={navClass}>Events</NavLink>
          {user ? <>
            <NavLink to="/my-registrations" className={navClass}>My Registrations</NavLink>
            {user.role === "admin" && <NavLink to="/admin" className={navClass}>Admin</NavLink>}
            <NotificationBell />
            <span className="rounded-md bg-slate-700 px-3 py-2 text-sm">{user.name} ({user.role})</span>
            <button type="button" onClick={signOut} className="rounded-lg bg-slate-700 px-4 py-2 font-semibold hover:bg-slate-600">Logout</button>
          </> : <>
            <NavLink to="/login" className={navClass}>Login</NavLink>
            <NavLink to="/register" className={navClass}>Register</NavLink>
          </>}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
