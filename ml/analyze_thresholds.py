import pandas as pd

df = pd.read_csv("data/CustomerDataset.csv")

churned = df[df["Churn"] == 1]
retained = df[df["Churn"] == 0]

print("Churned customers:", len(churned))
print("Retained customers:", len(retained))

print("\n--- Satisfaction Score ---")
print(
    df.groupby("Churn")["Satisfaction_Score"]
      .mean()
)

print("\n--- Transaction Change % ---")
print(
    df.groupby("Churn")["Transaction_Change_Pct"]
      .mean()
)

print("\n--- App Usage Change % ---")
print(
    df.groupby("Churn")["App_Usage_Change_Pct"]
      .mean()
)

print("\n--- Last Login Days ---")
print(
    df.groupby("Churn")["Last_Login_Days_Ago"]
      .mean()
)

print("\n--- Complaints ---")
print(
    df.groupby("Churn")["Complaints"]
      .mean()
)

print("\n--- Support Calls ---")
print(
    df.groupby("Churn")["Customer_Support_Calls"]
      .mean()
)

print("\n--- Loyalty Member ---")
print(
    pd.crosstab(
        df["Loyalty_Member"],
        df["Churn"],
        normalize="index"
    )
)