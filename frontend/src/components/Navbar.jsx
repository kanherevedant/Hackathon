import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition ${
            isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="h-16 flex items-center justify-between">

                    {/* BRAND */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                            R
                        </div>

                        <div>
                            <span className="text-lg font-bold text-slate-900">
                                RetainAI
                            </span>

                            <span className="hidden sm:block text-[10px] tracking-widest text-slate-400">
                                RETENTION INTELLIGENCE
                            </span>
                        </div>
                    </Link>


                    {/* NAVIGATION */}

                    <div className="hidden md:flex items-center gap-1">

                        <NavLink
                            to="/"
                            className={navClass}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/analytics"
                            className={navClass}
                        >
                            Analytics
                        </NavLink>

                        <NavLink
                            to="/customers"
                            className={navClass}
                        >
                            Customers
                        </NavLink>

                        <NavLink
                            to="/predictions"
                            className={navClass}
                        >
                            Predictions
                        </NavLink>

                    </div>


                    {/* RIGHT SIDE */}

                    <div className="flex items-center gap-4">

                        <div className="hidden sm:flex items-center gap-2">

                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>

                            <span className="text-sm text-slate-500">
                                ML System Online
                            </span>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;