import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [stats, setStats] = useState(null);
    const [risk, setRisk] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                setLoading(false);
                return;
            }

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

            if (!statsResponse.ok) {
                throw new Error(
                    "Unable to fetch dashboard statistics"
                );
            }

            if (!riskResponse.ok) {
                throw new Error(
                    "Unable to fetch risk distribution"
                );
            }

            const statsData = await statsResponse.json();
            const riskData = await riskResponse.json();

            setStats(statsData);
            setRisk(riskData);

        } catch (error) {
            console.error("Dashboard error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center bg-slate-50">

                <div className="text-center">

                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                    <h2 className="text-lg font-semibold text-slate-800">
                        Analyzing customer data
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        RetainAI is generating retention insights...
                    </p>

                </div>

            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center bg-slate-50">

                <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                        !
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900">
                        Unable to load dashboard
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {error}
                    </p>

                    <button
                        onClick={fetchDashboardData}
                        className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }

    // =========================
    // DATA
    // =========================

    const total = stats?.total_customers || 0;
    const churned = stats?.churned_customers || 0;
    const retained = stats?.retained_customers || 0;

    const highRisk = risk?.high_risk || 0;
    const mediumRisk = risk?.medium_risk || 0;
    const lowRisk = risk?.low_risk || 0;

    const highPercent =
        total > 0
            ? ((highRisk / total) * 100).toFixed(1)
            : 0;

    const mediumPercent =
        total > 0
            ? ((mediumRisk / total) * 100).toFixed(1)
            : 0;

    const lowPercent =
        total > 0
            ? ((lowRisk / total) * 100).toFixed(1)
            : 0;

    const retentionRate =
        total > 0
            ? ((retained / total) * 100).toFixed(1)
            : 0;

    // =========================
    // UI
    // =========================

    return (
        <main className="min-h-screen bg-slate-50">

            {/* ================= HERO ================= */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">

                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">

                        <div>

                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600">

                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>

                                Customer Retention Intelligence

                            </div>

                            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">

                                Turn customer data into

                                <span className="text-indigo-600">
                                    {" "}retention.
                                </span>

                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">

                                RetainAI uses machine learning to identify
                                customers who are likely to churn, understand
                                why they are at risk, and recommend actions
                                before they leave.

                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <Link
                                    to="/customers"
                                    className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    Explore Customers
                                </Link>

                                <Link
                                    to="/predictions"
                                    className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Run Prediction →
                                </Link>

                            </div>

                        </div>

                        {/* HERO STAT */}

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">

                            <div className="mb-6 flex items-center justify-between">

                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Customers analyzed
                                </span>

                                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                    ML Powered
                                </span>

                            </div>

                            <div className="text-5xl font-bold tracking-tight text-slate-900">
                                {total.toLocaleString()}
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                                Customers currently monitored by RetainAI
                            </p>

                            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-200">

                                <div
                                    className="h-full rounded-full bg-indigo-600"
                                    style={{
                                        width: `${retentionRate}%`,
                                    }}
                                ></div>

                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-400">

                                <span>
                                    Retention rate
                                </span>

                                <span>
                                    {retentionRate}%
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= KPI ================= */}

            <section className="mx-auto max-w-7xl px-6 py-10">

                <div className="mb-6">

                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                        Overview
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Customer performance
                    </h2>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* TOTAL */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-slate-500">
                                Total Customers
                            </span>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                👥
                            </div>

                        </div>

                        <div className="mt-4 text-3xl font-bold text-slate-900">
                            {total.toLocaleString()}
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                            Customers being monitored
                        </p>

                    </div>


                    {/* RETAINED */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-slate-500">
                                Retained
                            </span>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                ✓
                            </div>

                        </div>

                        <div className="mt-4 text-3xl font-bold text-slate-900">
                            {retained.toLocaleString()}
                        </div>

                        <p className="mt-1 text-xs text-emerald-600">
                            {retentionRate}% of customer base
                        </p>

                    </div>


                    {/* CHURNED */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-slate-500">
                                Churned
                            </span>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                                !
                            </div>

                        </div>

                        <div className="mt-4 text-3xl font-bold text-slate-900">
                            {churned.toLocaleString()}
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                            Historical churn
                        </p>

                    </div>


                    {/* CHURN RATE */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-slate-500">
                                Churn Rate
                            </span>

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                %
                            </div>

                        </div>

                        <div className="mt-4 text-3xl font-bold text-slate-900">
                            {stats?.churn_rate ?? 0}%
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                            Historical customer churn
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= RISK ================= */}

            <section className="mx-auto max-w-7xl px-6 pb-12">

                <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">

                    {/* LEFT */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                            Machine Learning
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            Who needs your attention?
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">

                            RetainAI evaluates customer behavior and assigns
                            each customer a churn-risk level so your team can
                            prioritize retention efforts.

                        </p>

                        <Link
                            to="/customers"
                            className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            View at-risk customers →
                        </Link>

                    </div>


                    {/* RIGHT */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Risk Distribution
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                    {total.toLocaleString()}
                                </h3>

                            </div>

                            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
                                Live analysis
                            </div>

                        </div>


                        {/* RISK BAR */}

                        <div className="mt-7 flex h-3 overflow-hidden rounded-full bg-slate-100">

                            <div
                                className="bg-red-400"
                                style={{
                                    width: `${highPercent}%`,
                                }}
                            ></div>

                            <div
                                className="bg-amber-400"
                                style={{
                                    width: `${mediumPercent}%`,
                                }}
                            ></div>

                            <div
                                className="bg-emerald-400"
                                style={{
                                    width: `${lowPercent}%`,
                                }}
                            ></div>

                        </div>


                        {/* RISK CARDS */}

                        <div className="mt-7 grid gap-4 sm:grid-cols-3">

                            {/* HIGH */}

                            <div className="rounded-xl bg-red-50 p-4">

                                <div className="flex items-center gap-2">

                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>

                                    <span className="text-xs font-semibold text-red-600">
                                        High Risk
                                    </span>

                                </div>

                                <div className="mt-3 text-2xl font-bold text-slate-900">
                                    {highRisk.toLocaleString()}
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                    {highPercent}% of customers
                                </p>

                            </div>


                            {/* MEDIUM */}

                            <div className="rounded-xl bg-amber-50 p-4">

                                <div className="flex items-center gap-2">

                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>

                                    <span className="text-xs font-semibold text-amber-600">
                                        Medium Risk
                                    </span>

                                </div>

                                <div className="mt-3 text-2xl font-bold text-slate-900">
                                    {mediumRisk.toLocaleString()}
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                    {mediumPercent}% of customers
                                </p>

                            </div>


                            {/* LOW */}

                            <div className="rounded-xl bg-emerald-50 p-4">

                                <div className="flex items-center gap-2">

                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>

                                    <span className="text-xs font-semibold text-emerald-600">
                                        Low Risk
                                    </span>

                                </div>

                                <div className="mt-3 text-2xl font-bold text-slate-900">
                                    {lowRisk.toLocaleString()}
                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                    {lowPercent}% of customers
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="mx-auto max-w-7xl px-6 pb-14">

                <div className="rounded-2xl bg-slate-900 px-7 py-8 sm:flex sm:items-center sm:justify-between">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                            Take Action
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-white">
                            Prevent churn before it happens.
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Explore customer risk factors and take targeted
                            retention actions.
                        </p>

                    </div>

                    <Link
                        to="/customers"
                        className="mt-5 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:mt-0"
                    >
                        Explore Customers →
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;