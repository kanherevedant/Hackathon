const RiskBadge = ({ churn, risk }) => {

    let label = "Low Risk";
    let classes = "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";

    if (risk === "High" || churn === 1) {
        label = "High Risk";
        classes = "bg-red-400/10 text-red-400 border-red-400/20";
    } else if (risk === "Medium") {
        label = "Medium Risk";
        classes = "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
    }

    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}
        >
            {label}
        </span>
    );
};

export default RiskBadge;