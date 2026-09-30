import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">
                        Leave Management
                    </h1>
                    <p className="text-sm text-slate-500">{title}</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;