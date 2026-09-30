import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                email, password,
            });

            const { token, role } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/employee");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-2xl font-bold text-slate-900">
                    Leave Management System
                </h1>

                <p className="mb-6 text-sm text-slate-500">
                    Sign in to continue
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white hover:bg-slate-800"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;