from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd

from predict import predict_customer
import joblib
from retention import (
    identify_risk_factors,
    generate_recommendations
)


app = FastAPI()


class CustomerData(BaseModel):
    Customer_ID: str
    Age: int
    Gender: str
    City_Tier: str
    Employment_Type: str
    Customer_Segment: str
    Tenure_Months: int
    Monthly_Income: int
    Account_Balance: int
    Credit_Score: int
    Product_Type: str
    Products_Used: int
    Preferred_Channel: str
    Loyalty_Member: str
    Transactions_Last_3M: int
    Transactions_Previous_3M: int
    Transaction_Change_Pct: float
    Avg_Transaction_Value: int
    App_Usage_Hours_Last_3M: float
    App_Usage_Hours_Previous_3M: float
    App_Usage_Change_Pct: float
    Last_Login_Days_Ago: int
    Customer_Support_Calls: int
    Complaints: int
    Satisfaction_Score: int
    Offers_Used: int
    Balance_Change_Pct: float

model = joblib.load("models/churn_model.pkl")
@app.get("/")
def home():
    return {
        "message": "Customer Churn ML API is running"
    }


@app.get("/model-status")
def model_status():
    return {
        "model_loaded": True
    }


@app.post("/predict")
def predict(customer: CustomerData):

    customer_dict = customer.model_dump()

    customer_id = customer_dict.pop("Customer_ID")

    # ML prediction
    result = predict_customer(customer_dict)

    # Identify risk factors
    risk_factors = identify_risk_factors(
        customer_dict
    )

    # Generate recommendations
    recommendations = generate_recommendations(
        customer_dict,
        risk_factors
    )

    # Build final response
    result["Customer_ID"] = customer_id

    result["risk_factors"] = risk_factors

    result["recommended_actions"] = recommendations

    return result

@app.post("/predict-batch")
def predict_batch(customers: List[CustomerData]):

    customer_ids = []
    customer_data = []

    for customer in customers:

        data = customer.model_dump()

        customer_ids.append(data.pop("Customer_ID"))

        # Remove Churn if it exists
        data.pop("Churn", None)

        customer_data.append(data)

    # Convert all customers into a DataFrame
    df = pd.DataFrame(customer_data)

    # ONE model prediction for all customers
    probabilities = model.predict_proba(df)[:, 1]

    results = []

    for customer_id, probability in zip(customer_ids, probabilities):

        probability = float(probability)

        prediction = int(probability >= 0.5)

        if probability >= 0.7:
            risk_level = "High"
        elif probability >= 0.3:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        results.append({
            "Customer_ID": customer_id,
            "prediction": prediction,
            "churn_probability": round(probability, 4),
            "risk_level": risk_level
        })

    return {
        "count": len(results),
        "predictions": results
    }