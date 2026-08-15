import pandas as pd

df = pd.read_csv("data/CustomerDataset.csv")

customer = df.iloc[0].drop(
    labels=[ "Churn"]
)

print(customer.to_json())