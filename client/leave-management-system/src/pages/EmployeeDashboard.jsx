import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {
    const navigate = useNavigate();

    const [leaveBalance, setLeaveBalance] = useState({
        total: 0,
        used: 0,
        remaining: 0,
    });

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const balanceResponse = await api.get("/api/leaves/balance");
                const leavesResponse = await api.get("/api/leaves/my-leaves");

                setLeaveBalance({
                    total: balanceResponse.data.totalDays,
                    used: balanceResponse.data.usedDays,
                    remaining: balanceResponse.data.remainingDays,
                });

                setLeaves(leavesResponse.data);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <Navbar title="Employee Dashboard" />

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Welcome */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Welcome, Employee
                    </h2>
                    <p className="mt-1 text-slate-500">
                        Here's an overview of your leave balance and requests.
                    </p>
                </div>

                {/* Balance Cards */}
                <div className="mb-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Total Leave</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {leaveBalance.total}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Days per year</p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Used Leave</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {leaveBalance.used}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Days used</p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Remaining Leave
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {leaveBalance.remaining}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Days available</p>
                    </div>
                </div>

                {/* Leave History */}
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b px-6 py-5">
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Leave Requests
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Your recent leave applications
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/apply-leave")}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Apply Leave
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 font-medium text-slate-500">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-3 font-medium text-slate-500">
                                        End Date
                                    </th>
                                    <th className="px-6 py-3 font-medium text-slate-500">
                                        Days
                                    </th>
                                    <th className="px-6 py-3 font-medium text-slate-500">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaves.map((leave) => (
                                    <tr key={leave.id} className="border-b last:border-0">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {leave.leaveType}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {leave.startDate}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {leave.endDate}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {leave.days}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-md px-3 py-1 text-xs font-semibold ${leave.status === "APPROVED"
                                                    ? "bg-green-100 text-green-700"
                                                    : leave.status === "REJECTED"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {leave.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EmployeeDashboard;