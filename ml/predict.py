import pandas as pd
import joblib


# Load model once
model = joblib.load("models/churn_model.pkl")


def predict_customer(customer_data):

    # Convert dictionary into DataFrame
    customer_df = pd.DataFrame([customer_data])

    # Prediction
    prediction = model.predict(customer_df)[0]

    # Churn probability
    probability = model.predict_proba(customer_df)[0][1]

    # Risk level
    if probability >= 0.7:
        risk_level = "High"
    elif probability >= 0.4:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "prediction": int(prediction),
        "churn_probability": round(float(probability), 4),
        "risk_level": risk_level
    }