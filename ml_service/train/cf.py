import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from db import engine


DATA_PATH = "./data/raw_ratings.csv"
ARTIFACTS_DIR = "artifacts"

def import_ratings_to_db(csv_path, engine):
    try:
        df = pd.read_csv(csv_path)
        # Rename columns to match your ratings table
        df = df.rename(columns={
            "userId": "userid",
            "movieId": "movieid",
            "rating": "rating"
        })
        # Optionally drop timestamp if not needed
        if "timestamp" in df.columns:
            df = df.drop(columns=["timestamp"])
        df.to_sql("ratings", engine, if_exists="append", index=False)
        print(f"✅ Imported {len(df)} ratings to database.")
    except Exception as e:
        print("⚠️ Could not import ratings to database:", e)

def fetch_ratings_from_db(engine):
    try:
        df = pd.read_sql("SELECT * FROM ratings", engine)
        print(f"✅ Fetched {len(df)} ratings from database.")
        return df
    except Exception as e:
        print("⚠️ Could not fetch ratings from database:", e)
        return pd.DataFrame()  # Return empty DataFrame on error

def train_model():
    print("This is Collaborative Filtering training script.")

if __name__ == "__main__":
    import_ratings_to_db(DATA_PATH, engine)
    fetch_ratings_from_db(engine)
    train_model()

