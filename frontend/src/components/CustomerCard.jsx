import { Link } from "react-router-dom";
import RiskBadge from "./RiskBadge";

const CustomerCard = ({ customer }) => {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40">

            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Customer ID
                    </p>

                    <h3 className="mt-1 font-semibold text-white">
                        {customer.Customer_ID}
                    </h3>
                </div>

                <RiskBadge churn={customer.Churn} />
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <p className="text-xs text-slate-500">Segment</p>
                    <p className="mt-1 text-sm text-slate-200">
                        {customer.Customer_Segment}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">Product</p>
                    <p className="mt-1 text-sm text-slate-200">
                        {customer.Product_Type}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">Satisfaction</p>
                    <p className="mt-1 text-sm text-slate-200">
                        {customer.Satisfaction_Score}/5
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">Last Login</p>
                    <p className="mt-1 text-sm text-slate-200">
                        {customer.Last_Login_Days_Ago} days ago
                    </p>
                </div>

            </div>

            <Link
                to={`/customers/${customer.Customer_ID}`}
                className="mt-5 block rounded-lg bg-slate-800 py-2.5 text-center text-sm font-medium text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
            >
                View Customer
            </Link>

        </div>
    );
};

export default CustomerCard;