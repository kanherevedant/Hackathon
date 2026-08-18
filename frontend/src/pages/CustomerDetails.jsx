import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CustomerDetails = () => {
    const { id } = useParams();

    const [customer, setCustomer] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCustomerDetails();
    }, [id]);

    const fetchCustomerDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/api/customers/${id}/risk`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch customer details");
            }

            const data = await response.json();

            setCustomer(data.customer);
            setPrediction(data.prediction);

        } catch (error) {
            console.error("Customer details error:", error);
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
                        Analyzing customer
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        RetainAI is calculating churn risk...
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

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                        !
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-900">
                        Unable to load customer
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {error}
                    </p>

                    <Link
                        to="/customers"
                        className="mt-5 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        ← Back to Customers
                    </Link>

                </div>

            </div>
        );
    }

    if (!customer) {
        return null;
    }

    // =========================
    // ML DATA
    // =========================

    const probability =
        Number(prediction?.churn_probability || 0) * 100;

    const riskLevel =
        prediction?.risk_level || "Unknown";

    const riskStyles = {
        High: "bg-red-50 text-red-600 border-red-100",
        Medium: "bg-amber-50 text-amber-600 border-amber-100",
        Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
    };

    const riskBarStyles = {
        High: "bg-red-500",
        Medium: "bg-amber-500",
        Low: "bg-emerald-500",
    };

    const riskStyle =
        riskStyles[riskLevel] ||
        "bg-slate-50 text-slate-600 border-slate-200";

    const riskBarStyle =
        riskBarStyles[riskLevel] ||
        "bg-indigo-500";

    return (
        <main className="min-h-screen bg-slate-50">

            {/* =========================
                HEADER
            ========================= */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-8">

                    <Link
                        to="/customers"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                        ← Back to Customers
                    </Link>

                    <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Customer Profile
                            </p>

                            <h1 className="mt-1 text-3xl font-bold text-slate-900">
                                {customer.Customer_ID}
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                {customer.Product_Type} customer
                            </p>

                        </div>

                        <div
                            className={`rounded-xl border px-4 py-2 text-sm font-bold ${riskStyle}`}
                        >
                            {riskLevel} Risk
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                CONTENT
            ========================= */}

            <section className="mx-auto max-w-7xl px-6 py-8">

                <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">

                    {/* =========================
                        LEFT COLUMN
                    ========================= */}

                    <div className="space-y-6">

                        {/* CUSTOMER INFORMATION */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6">

                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                    Customer Information
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    Profile Overview
                                </h2>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                <InfoItem
                                    label="Age"
                                    value={customer.Age}
                                />

                                <InfoItem
                                    label="Gender"
                                    value={customer.Gender}
                                />

                                <InfoItem
                                    label="City Tier"
                                    value={customer.City_Tier}
                                />

                                <InfoItem
                                    label="Employment"
                                    value={customer.Employment_Type}
                                />

                                <InfoItem
                                    label="Segment"
                                    value={customer.Customer_Segment}
                                />

                                <InfoItem
                                    label="Product"
                                    value={customer.Product_Type}
                                />

                                <InfoItem
                                    label="Tenure"
                                    value={`${customer.Tenure_Months} months`}
                                />

                                <InfoItem
                                    label="Monthly Income"
                                    value={`₹${Number(
                                        customer.Monthly_Income || 0
                                    ).toLocaleString()}`}
                                />

                                <InfoItem
                                    label="Account Balance"
                                    value={`₹${Number(
                                        customer.Account_Balance || 0
                                    ).toLocaleString()}`}
                                />

                                <InfoItem
                                    label="Credit Score"
                                    value={customer.Credit_Score}
                                />

                                <InfoItem
                                    label="Products Used"
                                    value={customer.Products_Used}
                                />

                                <InfoItem
                                    label="Loyalty Member"
                                    value={customer.Loyalty_Member}
                                />

                            </div>

                        </div>


                        {/* CUSTOMER BEHAVIOR */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-6">

                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                    Customer Behavior
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    Engagement Signals
                                </h2>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                <InfoItem
                                    label="Transactions (Last 3M)"
                                    value={customer.Transactions_Last_3M}
                                />

                                <InfoItem
                                    label="Transaction Change"
                                    value={`${customer.Transaction_Change_Pct}%`}
                                />

                                <InfoItem
                                    label="Average Transaction"
                                    value={`₹${Number(
                                        customer.Avg_Transaction_Value || 0
                                    ).toLocaleString()}`}
                                />

                                <InfoItem
                                    label="App Usage"
                                    value={`${customer.App_Usage_Hours_Last_3M} hrs`}
                                />

                                <InfoItem
                                    label="App Usage Change"
                                    value={`${customer.App_Usage_Change_Pct}%`}
                                />

                                <InfoItem
                                    label="Last Login"
                                    value={`${customer.Last_Login_Days_Ago} days ago`}
                                />

                                <InfoItem
                                    label="Support Calls"
                                    value={customer.Customer_Support_Calls}
                                />

                                <InfoItem
                                    label="Complaints"
                                    value={customer.Complaints}
                                />

                                <InfoItem
                                    label="Satisfaction"
                                    value={`${customer.Satisfaction_Score}/5`}
                                />

                                <InfoItem
                                    label="Offers Used"
                                    value={customer.Offers_Used}
                                />

                                <InfoItem
                                    label="Preferred Channel"
                                    value={customer.Preferred_Channel}
                                />

                                <InfoItem
                                    label="Balance Change"
                                    value={`${customer.Balance_Change_Pct}%`}
                                />

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        RIGHT COLUMN - ML
                    ========================= */}

                    <div className="space-y-6">

                        {/* RISK SCORE */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                Machine Learning
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                Churn Risk
                            </h2>

                            <div className="mt-6 text-center">

                                <div className="text-5xl font-bold text-slate-900">
                                    {probability.toFixed(1)}%
                                </div>

                                <p className="mt-2 text-sm text-slate-500">
                                    Probability of customer churn
                                </p>

                            </div>

                            {/* RISK BAR */}

                            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">

                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${riskBarStyle}`}
                                    style={{
                                        width: `${Math.min(
                                            probability,
                                            100
                                        )}%`,
                                    }}
                                ></div>

                            </div>

                            <div className="mt-2 flex justify-between text-xs text-slate-400">
                                <span>0%</span>
                                <span>100%</span>
                            </div>

                            <div className="mt-5 text-center">

                                <span
                                    className={`inline-flex rounded-lg border px-3 py-1.5 text-sm font-semibold ${riskStyle}`}
                                >
                                    {riskLevel} Risk
                                </span>

                            </div>

                        </div>


                        {/* RISK FACTORS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                                Why at risk?
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                Risk Factors
                            </h2>

                            <div className="mt-5 space-y-3">

                                {prediction?.risk_factors?.length > 0 ? (

                                    prediction.risk_factors.map(
                                        (factor, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700"
                                            >
                                                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                                                    !
                                                </span>

                                                {factor}
                                            </div>
                                        )
                                    )

                                ) : (

                                    <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
                                        ✓ No major risk factors detected.
                                    </div>

                                )}

                            </div>

                        </div>


                        {/* RECOMMENDATIONS */}

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                Recommended Action
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-slate-900">
                                Retention Strategy
                            </h2>

                            <div className="mt-5 space-y-3">

                                {prediction?.recommended_actions?.length > 0 ? (

                                    prediction.recommended_actions.map(
                                        (action, index) => (
                                            <div
                                                key={index}
                                                className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700"
                                            >
                                                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                                                    ✓
                                                </span>

                                                {action}
                                            </div>
                                        )
                                    )

                                ) : (

                                    <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                        No specific retention action required.
                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};


// =========================
// REUSABLE INFO ITEM
// =========================

const InfoItem = ({ label, value }) => {
    return (
        <div className="rounded-xl bg-slate-50 p-3">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
                {value ?? "—"}
            </p>

        </div>
    );
};

export default CustomerDetails;