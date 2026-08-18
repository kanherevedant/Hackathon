import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-50">
                <Outlet />
            </main>
        </>
    );
};

export default ProtectedRoute;