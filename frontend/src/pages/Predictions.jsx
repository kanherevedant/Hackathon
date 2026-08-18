import { useState } from "react";
import { Link } from "react-router-dom";

const Predictions = () => {
    const [customerId, setCustomerId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePrediction = async (e) => {
        e.preventDefault();

        setError("");
        setResult(null);

        if (!customerId.trim()) {
            setError("Please enter a Customer ID.");
            return;
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/customers/${customerId}/risk`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to generate prediction."
                );
            }

            setResult(data);

        } catch (error) {
            console.error("Prediction error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const prediction = result?.prediction;

    const probability =
        Number(prediction?.churn_probability || 0) * 100;

    const riskLevel = prediction?.risk_level || "Unknown";

    const riskStyles = {
        High: "bg-red-50 text-red-600 border-red-100",
        Medium: "bg-amber-50 text-amber-600 border-amber-100",
        Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };

    const riskStyle =
        riskStyles[riskLevel] ||
        "bg-slate-50 text-slate-600 border-slate-200";

    return (
        <main className="min-h-screen bg-slate-50">

            {/* HEADER */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-5xl px-6 py-10">

                    <Link
                        to="/"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="mt-6">

                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                            Machine Learning
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Customer Churn Prediction
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Enter a customer ID to analyze their churn
                            probability, identify risk factors, and receive
                            recommended retention actions.
                        </p>

                    </div>

                </div>

            </section>


            {/* CONTENT */}

            <section className="mx-auto max-w-5xl px-6 py-10">

                {/* SEARCH CARD */}

                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Run Prediction
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                        Analyze a customer
                    </h2>

                    <form
                        onSubmit={handlePrediction}
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                    >

                        <input
                            type="text"
                            value={customerId}
                            onChange={(e) =>
                                setCustomerId(e.target.value)
                            }
                            placeholder="Enter Customer ID e.g. C100001"
                            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Analyzing..."
                                : "Run Prediction"}
                        </button>

                    </form>

                    {error && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                </div>


                {/* RESULT */}

                {result && prediction && (
                    <div className="mt-6 space-y-6">

                        {/* CUSTOMER + RISK */}

                        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

                            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Customer
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                    {result.customer?.Customer_ID}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {result.customer?.Product_Type} •{" "}
                                    {result.customer?.Customer_Segment}
                                </p>

                                <div className="mt-7 grid gap-5 sm:grid-cols-3">

                                    <Stat
                                        label="Satisfaction"
                                        value={`${result.customer?.Satisfaction_Score}/5`}
                                    />

                                    <Stat
                                        label="Last Login"
                                        value={`${result.customer?.Last_Login_Days_Ago} days`}
                                    />

                                    <Stat
                                        label="Transactions"
                                        value={result.customer?.Transactions_Last_3M}
                                    />

                                </div>

                            </div>


                            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">

                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Churn Probability
                                </p>

                                <div className="mt-4 text-5xl font-bold text-slate-900">
                                    {probability.toFixed(1)}%
                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

                                    <div
                                        className="h-full rounded-full bg-indigo-600"
                                        style={{
                                            width: `${Math.min(
                                                probability,
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                                <span
                                    className={`mt-5 inline-flex rounded-lg border px-4 py-2 text-sm font-semibold ${riskStyle}`}
                                >
                                    {riskLevel} Risk
                                </span>

                            </div>

                        </div>


                        {/* RISK FACTORS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                                Explainable AI
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                Why is this customer at risk?
                            </h2>

                            <div className="mt-5 space-y-3">

                                {prediction.risk_factors?.length > 0 ? (
                                    prediction.risk_factors.map(
                                        (factor, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
                                            >
                                                <span className="mr-2 font-bold">
                                                    !
                                                </span>

                                                {factor}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No major risk factors detected.
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* RECOMMENDATIONS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                Recommended Actions
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                Retention Strategy
                            </h2>

                            <div className="mt-5 space-y-3">

                                {prediction.recommended_actions?.length > 0 ? (
                                    prediction.recommended_actions.map(
                                        (action, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"
                                            >
                                                <span className="mr-2 font-bold">
                                                    ✓
                                                </span>

                                                {action}
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No specific retention action required.
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* CUSTOMER DETAILS BUTTON */}

                        <div className="flex justify-end">

                            <Link
                                to={`/customers/${result.customer?.Customer_ID}`}
                                className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                View Full Customer Profile →
                            </Link>

                        </div>

                    </div>
                )}

            </section>

        </main>
    );
};


// =========================
// REUSABLE STAT
// =========================

const Stat = ({ label, value }) => {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
                {value ?? "—"}
            </p>
        </div>
    );
};

export default Predictions;