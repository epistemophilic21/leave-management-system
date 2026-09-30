import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await api.get("/api/admin/leaves");
            setLeaves(response.data);
        } catch (error) {
            console.error("Failed to load leave requests:", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.patch(`/api/admin/leaves/${id}/approve`);
            await fetchLeaves();
        } catch (error) {
            console.error("Failed to approve leave:", error);
            alert("Failed to approve leave");
        }
    };

    const handleReject = async (id) => {
        try {
            await api.patch(`/api/admin/leaves/${id}/reject`);
            await fetchLeaves();
        } catch (error) {
            console.error("Failed to reject leave:", error);
            alert("Failed to reject leave");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Leave Management
                        </h1>
                        <p className="text-sm text-slate-500">Admin Dashboard</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Leave Requests
                    </h2>
                    <p className="mt-1 text-slate-500">
                        Review and manage employee leave requests.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Employee
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Leave Type
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Dates
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Days
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Reason
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-medium text-slate-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaves.map((leave) => (
                                    <tr key={leave.id} className="border-b last:border-0">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900">
                                                {leave.employeeName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {leave.employeeEmail}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-slate-700">
                                            {leave.leaveType}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            <div>{leave.startDate}</div>
                                            <div>{leave.endDate}</div>
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            {leave.days}
                                        </td>

                                        <td className="max-w-xs px-6 py-4 text-slate-600">
                                            {leave.reason}
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

                                        <td className="px-6 py-4">
                                            {leave.status === "PENDING" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(leave.id)}
                                                        className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800"
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() => handleReject(leave.id)}
                                                        className="rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}

                                            {leave.status !== "PENDING" && (
                                                <span className="text-xs text-slate-400">
                                                    Reviewed
                                                </span>
                                            )}
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

export default AdminDashboard;