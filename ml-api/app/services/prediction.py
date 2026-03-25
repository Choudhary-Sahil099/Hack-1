import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# 🔥 Load model
model = pickle.load(open("app/models/model.pkl", "rb"))

# 🔥 Load dataset
df = pd.read_csv("app/models/Mandi_dataset_API.csv")

# 🔥 Create encoders (same logic as training)
state_encoder = LabelEncoder()
district_encoder = LabelEncoder()
market_encoder = LabelEncoder()
commodity_encoder = LabelEncoder()

df['State_enc'] = state_encoder.fit_transform(df['State'])
df['District_enc'] = district_encoder.fit_transform(df['District'])
df['Market_enc'] = market_encoder.fit_transform(df['Market'])
df['Commodity_enc'] = commodity_encoder.fit_transform(df['Commodity'])
df['Arrival_Date'] = pd.to_datetime(df['Arrival_Date'])
df['Day'] = df['Arrival_Date'].dt.day
df['Month'] = df['Arrival_Date'].dt.month


def predict_price(data):
    try:
        # 🔍 Filter dataset (same as notebook)
        filtered_df = df[
            df['State'].str.lower().str.contains(data.state.lower(), na=False) &
            df['District'].str.lower().str.contains(data.district.lower(), na=False) &
            df['Commodity'].str.lower().str.contains(data.commodity.lower(), na=False)
        ].copy()

        if len(filtered_df) == 0:
            return {"error": "No data found for given input"}
        features = filtered_df[
            ['State_enc', 'District_enc', 'Market_enc', 'Commodity_enc', 'Day', 'Month']
        ]

        filtered_df['Predicted_Price'] = model.predict(features)
        best_mandi = filtered_df.loc[filtered_df['Predicted_Price'].idxmax()]

        top3 = filtered_df.sort_values(by='Predicted_Price', ascending=False).head(3)

        return {
            "best_mandi": best_mandi['Market'],
            "expected_price": float(round(best_mandi['Predicted_Price'], 2)),
            "top_mandis": [
                {
                    "name": row['Market'],
                    "price": float(round(row['Predicted_Price'], 2))
                }
                for _, row in top3.iterrows()
            ]
        }

    except Exception as e:
        return {"error": str(e)}