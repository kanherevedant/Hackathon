def identify_risk_factors(customer):

    risk_factors = []

    # 1. Low satisfaction
    if customer["Satisfaction_Score"] <= 6:
        risk_factors.append(
            "Customer satisfaction is below the churned-customer average"
        )

    # 2. Transaction decline
    if customer["Transaction_Change_Pct"] <= -10:
        risk_factors.append(
            "Transaction activity has declined significantly"
        )

    # 3. App engagement decline
    if customer["App_Usage_Change_Pct"] <= -10:
        risk_factors.append(
            "App usage has declined significantly"
        )

    # 4. Recent inactivity
    if customer["Last_Login_Days_Ago"] >= 15:
        risk_factors.append(
            "Customer has been inactive recently"
        )

    # 5. Complaints
    if customer["Complaints"] >= 2:
        risk_factors.append(
            "Customer has multiple complaints"
        )

    # 6. Support calls
    if customer["Customer_Support_Calls"] >= 3:
        risk_factors.append(
            "Customer has high support activity"
        )

    return risk_factors

def generate_recommendations(customer, risk_factors):

    recommendations = []

    if customer["Satisfaction_Score"] <= 6:
        recommendations.append(
            "Contact customer to understand and address satisfaction issues"
        )

    if customer["Transaction_Change_Pct"] <= -10:
        recommendations.append(
            "Provide a personalized transaction incentive"
        )

    if customer["App_Usage_Change_Pct"] <= -10:
        recommendations.append(
            "Launch a digital engagement campaign"
        )

    if customer["Last_Login_Days_Ago"] >= 15:
        recommendations.append(
            "Send a personalized re-engagement notification"
        )

    if customer["Complaints"] >= 2:
        recommendations.append(
            "Prioritize complaint resolution"
        )

    if customer["Customer_Support_Calls"] >= 3:
        recommendations.append(
            "Assign proactive customer support follow-up"
        )

    return recommendations


if __name__ == "__main__":

    customer = {
        "Satisfaction_Score": 1,
        "App_Usage_Change_Pct": -6.7,
        "Transaction_Change_Pct": 3.3,
        "Last_Login_Days_Ago": 13,
        "Complaints": 0,
        "Customer_Support_Calls": 0,
        "Loyalty_Member": "No"
    }

    risk_factors = identify_risk_factors(customer)

    recommendations = generate_recommendations(
        customer,
        risk_factors
    )

    print("Risk Factors:")
    print(risk_factors)

    print("\nRecommendations:")
    print(recommendations)