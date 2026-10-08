import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-blue-400"
        >
          EventHub
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="font-medium text-slate-200 transition hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="font-medium text-slate-200 transition hover:text-blue-400"
          >
            Events
          </Link>

          <Link
            to="/login"
            className="font-medium text-slate-200 transition hover:text-blue-400"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;