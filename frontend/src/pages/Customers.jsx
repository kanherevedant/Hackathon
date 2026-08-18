import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Customers = () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [churn, setChurn] = useState("");
    const [segment, setSegment] = useState("");
    const [loyalty, setLoyalty] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCustomers, setTotalCustomers] = useState(0);

    const limit = 10;

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const params = new URLSearchParams();

            params.append("page", page);
            params.append("limit", limit);

            if (search.trim()) {
                params.append("search", search.trim());
            }

            if (churn !== "") {
                params.append("churn", churn);
            }

            if (segment !== "") {
                params.append("segment", segment);
            }

            if (loyalty !== "") {
                params.append("loyalty", loyalty);
            }

            const response = await fetch(
                `http://localhost:5000/api/customers?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }

            const data = await response.json();

            setCustomers(data.customers || []);
            setTotalPages(data.total_pages || 1);
            setTotalCustomers(data.total_customers || 0);
        } catch (err) {
            console.error("Customer fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [page, churn, segment, loyalty]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchCustomers();
    };

    const clearFilters = () => {
        setSearch("");
        setChurn("");
        setSegment("");
        setLoyalty("");
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-slate-50">

            {/* HEADER */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-8">

                    <Link
                        to="/"
                        className="mb-5 inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                Customer Intelligence
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                                Customers
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Monitor customer behavior and identify
                                potential churn risks.
                            </p>

                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3">

                            <p className="text-xs text-slate-400">
                                Total matching customers
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {totalCustomers.toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CONTENT */}

            <section className="mx-auto max-w-7xl px-6 py-8">

                {/* FILTERS */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="mb-4">

                        <p className="text-sm font-semibold text-slate-900">
                            Customer filters
                        </p>

                        <p className="text-xs text-slate-400">
                            Search and filter your customer base
                        </p>

                    </div>


                    <form
                        onSubmit={handleSearch}
                        className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
                    >

                        {/* SEARCH */}

                        <div className="relative">

                            <input
                                type="text"
                                placeholder="Search Customer ID..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            />

                        </div>


                        {/* CHURN */}

                        <select
                            value={churn}
                            onChange={(e) => {
                                setChurn(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >

                            <option value="">
                                Churn Status
                            </option>

                            <option value="0">
                                Retained
                            </option>

                            <option value="1">
                                Churned
                            </option>

                        </select>


                        {/* SEGMENT */}

                        <select
                            value={segment}
                            onChange={(e) => {
                                setSegment(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >

                            <option value="">
                                All Segments
                            </option>

                            <option value="Standard">
                                Standard
                            </option>

                            <option value="Basic">
                                Basic
                            </option>

                            <option value="High Value">
                                High Value
                            </option>

                            <option value="Emerging">
                                Emerging
                            </option>

                        </select>


                        {/* LOYALTY */}

                        <select
                            value={loyalty}
                            onChange={(e) => {
                                setLoyalty(e.target.value);
                                setPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >

                            <option value="">
                                Loyalty
                            </option>

                            <option value="Yes">
                                Loyalty Member
                            </option>

                            <option value="No">
                                Non Member
                            </option>

                        </select>


                        {/* SEARCH BUTTON */}

                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Search
                        </button>

                    </form>


                    {/* CLEAR */}

                    {(search || churn || segment || loyalty) && (
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-xs font-medium text-slate-500 hover:text-indigo-600"
                        >
                            Clear all filters
                        </button>
                    )}

                </div>


                {/* ERROR */}

                {error && (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* TABLE */}

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px]">

                            <thead className="border-b border-slate-200 bg-slate-50">

                                <tr>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Segment
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Product
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Satisfaction
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Last Login
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Loyalty
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Status
                                    </th>

                                    <th className="px-5 py-4"></th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-slate-100">

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="px-5 py-16 text-center"
                                        >

                                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                                            <p className="mt-3 text-sm text-slate-400">
                                                Loading customers...
                                            </p>

                                        </td>

                                    </tr>

                                ) : customers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="px-5 py-16 text-center"
                                        >

                                            <p className="font-medium text-slate-700">
                                                No customers found
                                            </p>

                                            <p className="mt-1 text-sm text-slate-400">
                                                Try changing your filters.
                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    customers.map((customer) => (

                                        <tr
                                            key={customer.Customer_ID}
                                            className="transition hover:bg-slate-50"
                                        >

                                            {/* CUSTOMER */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                                                        {customer.Customer_ID?.slice(
                                                            -2
                                                        )}
                                                    </div>

                                                    <div>

                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {customer.Customer_ID}
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            {customer.Gender},{" "}
                                                            {customer.Age} yrs
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* SEGMENT */}

                                            <td className="px-5 py-4">

                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {customer.Customer_Segment}
                                                </span>

                                            </td>


                                            {/* PRODUCT */}

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {customer.Product_Type}
                                            </td>


                                            {/* SATISFACTION */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-2">

                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {customer.Satisfaction_Score}/5
                                                    </span>

                                                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">

                                                        <div
                                                            className="h-full rounded-full bg-indigo-500"
                                                            style={{
                                                                width: `${
                                                                    (customer.Satisfaction_Score /
                                                                        5) *
                                                                    100
                                                                }%`,
                                                            }}
                                                        ></div>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* LOGIN */}

                                            <td className="px-5 py-4 text-sm text-slate-600">

                                                {customer.Last_Login_Days_Ago} days ago

                                            </td>


                                            {/* LOYALTY */}

                                            <td className="px-5 py-4">

                                                {customer.Loyalty_Member ===
                                                "Yes" ? (

                                                    <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                                        Member
                                                    </span>

                                                ) : (

                                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                                                        No
                                                    </span>

                                                )}

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-5 py-4">

                                                {customer.Churn === 1 ? (

                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">

                                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>

                                                        Churned

                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">

                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                                        Retained

                                                    </span>

                                                )}

                                            </td>


                                            {/* DETAILS */}

                                            <td className="px-5 py-4 text-right">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/customers/${customer.Customer_ID}`
                                                        )
                                                    }
                                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                                                >
                                                    View →
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* PAGINATION */}

                    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs text-slate-400">
                            Page{" "}
                            <span className="font-semibold text-slate-600">
                                {page}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-600">
                                {totalPages}
                            </span>
                        </p>

                        <div className="flex items-center gap-2">

                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ← Previous
                            </button>

                            <button
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((p) =>
                                        Math.min(totalPages, p + 1)
                                    )
                                }
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next →
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default Customers;