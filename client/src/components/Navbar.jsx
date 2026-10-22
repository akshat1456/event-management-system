import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* EventHub Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
        >
          EventHub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base ${
                isActive
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-200 hover:bg-slate-800 hover:text-blue-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base ${
                isActive
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-200 hover:bg-slate-800 hover:text-blue-400"
              }`
            }
          >
            Events
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition sm:text-base ${
                isActive
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-200 hover:bg-slate-800 hover:text-blue-400"
              }`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-semibold text-white transition sm:text-base ${
                isActive
                  ? "bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`
            }
          >
            Register
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;