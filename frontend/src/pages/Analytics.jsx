import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [risk, setRisk] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const [statsResponse, riskResponse] = await Promise.all([
                fetch("http://localhost:5000/api/dashboard/stats", {
                    headers,
                }),
                fetch(
                    "http://localhost:5000/api/dashboard/risk-distribution",
                    {
                        headers,
                    }
                ),
            ]);

            if (!statsResponse.ok || !riskResponse.ok) {
                throw new Error("Failed to load analytics");
            }

            const statsData = await statsResponse.json();
            const riskData = await riskResponse.json();

            setStats(statsData);
            setRisk(riskData);
        } catch (err) {
            console.error("Analytics error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        Loading analytics
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Analyzing customer retention data...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
                    <h2 className="text-xl font-semibold text-red-600">
                        Unable to load analytics
                    </h2>
                    <p className="text-slate-500 mt-2">{error}</p>

                    <button
                        onClick={fetchAnalytics}
                        className="mt-5 px-5 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const churnData = [
        {
            name: "Retained",
            value: stats.retained_customers,
        },
        {
            name: "Churned",
            value: stats.churned_customers,
        },
    ];

    const riskData = [
        {
            name: "High Risk",
            value: risk.high_risk,
        },
        {
            name: "Medium Risk",
            value: risk.medium_risk,
        },
        {
            name: "Low Risk",
            value: risk.low_risk,
        },
    ];

    const CHURN_COLORS = ["#10b981", "#ef4444"];
    const RISK_COLORS = ["#ef4444", "#f59e0b", "#10b981"];

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">

            {/* HEADER */}

            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <p className="text-sm font-semibold tracking-widest text-indigo-600">
                        RETENTION INTELLIGENCE
                    </p>

                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2">
                        Analytics Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Understand customer behavior, churn and retention risk.
                    </p>
                </div>


                {/* KPI CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            TOTAL CUSTOMERS
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-3">
                            {stats.total_customers.toLocaleString()}
                        </h2>

                        <p className="text-sm text-slate-400 mt-2">
                            Customers monitored
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            RETAINED
                        </p>

                        <h2 className="text-3xl font-bold text-emerald-600 mt-3">
                            {stats.retained_customers.toLocaleString()}
                        </h2>

                        <p className="text-sm text-slate-400 mt-2">
                            {(
                                (stats.retained_customers /
                                    stats.total_customers) *
                                100
                            ).toFixed(1)}
                            % of customer base
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            CHURNED
                        </p>

                        <h2 className="text-3xl font-bold text-red-500 mt-3">
                            {stats.churned_customers.toLocaleString()}
                        </h2>

                        <p className="text-sm text-slate-400 mt-2">
                            Historical churn
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            CHURN RATE
                        </p>

                        <h2 className="text-3xl font-bold text-indigo-600 mt-3">
                            {stats.churn_rate}%
                        </h2>

                        <p className="text-sm text-slate-400 mt-2">
                            Current historical rate
                        </p>
                    </div>

                </div>


                {/* CHARTS */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* CHURN CHART */}

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Customer Retention
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Retained vs historically churned customers
                            </p>
                        </div>

                        <div className="h-72">

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>

                                    <Pie
                                        data={churnData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={105}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {churnData.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={CHURN_COLORS[index]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />

                                </PieChart>
                            </ResponsiveContainer>

                        </div>

                        <div className="flex justify-center gap-8">

                            {churnData.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                CHURN_COLORS[index],
                                        }}
                                    ></span>

                                    <span className="text-sm text-slate-600">
                                        {item.name}:{" "}
                                        <strong className="text-slate-900">
                                            {item.value.toLocaleString()}
                                        </strong>
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>


                    {/* RISK CHART */}

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-slate-900">
                                ML Risk Distribution
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Customers classified by retention risk
                            </p>
                        </div>

                        <div className="h-72">

                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={riskData}>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "#64748b" }}
                                    />

                                    <YAxis
                                        tick={{ fill: "#64748b" }}
                                    />

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        radius={[8, 8, 0, 0]}
                                    >
                                        {riskData.map((entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={RISK_COLORS[index]}
                                            />
                                        ))}
                                    </Bar>

                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>


                {/* INSIGHTS */}

                <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

                    <div className="flex items-start gap-4">

                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                            ✦
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Retention Insight
                            </h2>

                            <p className="text-slate-500 mt-2 leading-relaxed">
                                Your current historical churn rate is{" "}
                                <strong className="text-slate-900">
                                    {stats.churn_rate}%
                                </strong>
                                . The ML model has additionally classified{" "}
                                <strong className="text-red-500">
                                    {risk.high_risk.toLocaleString()}
                                </strong>{" "}
                                customers as high risk and{" "}
                                <strong className="text-amber-500">
                                    {risk.medium_risk.toLocaleString()}
                                </strong>{" "}
                                as medium risk.
                            </p>

                            <p className="text-slate-500 mt-2">
                                These customers should be prioritized for
                                proactive retention campaigns.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default Analytics;