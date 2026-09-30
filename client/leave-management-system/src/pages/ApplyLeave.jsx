import { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ApplyLeave() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        leaveType: "CASUAL",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/leaves", form);

            alert("Leave applied successfully");

            navigate("/employee");
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message ||
                "Failed to apply leave"
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="border-b bg-white">
                <div className="mx-auto max-w-4xl px-6 py-4">
                    <h1 className="text-xl font-bold text-slate-900">
                        Leave Management
                    </h1>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-6 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Apply for Leave
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Submit a new leave request.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl bg-white p-6 shadow-sm"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Leave Type
                            </label>

                            <select
                                name="leaveType"
                                value={form.leaveType}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
                            >
                                <option value="CASUAL">Casual</option>
                                <option value="SICK">Sick</option>
                                <option value="EARNED">Earned</option>
                            </select>
                        </div>

                        <div />

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                End Date
                            </label>

                            <input
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Reason
                            </label>

                            <textarea
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter reason for leave"
                                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            onClick={() => navigate("/employee")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Submit Leave
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default ApplyLeave;