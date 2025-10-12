import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from train.preprocess import load_and_clean_movies
from db import engine


DATA_PATH = "./data/raw_movies.csv"
ARTIFACTS_DIR = "artifacts"

def import_movies_to_db(csv_path, engine):
    try:
        df = pd.read_csv(csv_path)
        df.to_sql("movies", engine, if_exists="append", index=False)
        print(f"✅ Imported {len(df)} movies to database.")
    except Exception as e:
        print("⚠️ Could not import movies to database:", e)

def fetch_movies_from_db(engine):
    try:
        df = pd.read_sql("SELECT * FROM movies", engine)
        print(f"✅ Fetched {len(df)} movies from database.")
        return df
    except Exception as e:
        print("⚠️ Could not fetch movies from database:", e)
        return pd.DataFrame()  # Return empty DataFrame on error

def train_model():
    
    # Step 1: Import CSV to DB (run once, comment after first run to avoid duplicates)
    # import_movies_to_db(DATA_PATH, engine)
    # Step 2: Fetch and clean movies from DB
    raw_df = fetch_movies_from_db(engine)
    df = load_and_clean_movies(raw_df)

    # Step 3: Train model
    vectorizer = CountVectorizer(stop_words="english", max_features=10000)
    tfidf_matrix = vectorizer.fit_transform(df["tags"].values.astype('U'))  # keep as sparse

    # Step 4: Save artifacts
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    joblib.dump(vectorizer, os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.joblib"))
    joblib.dump(tfidf_matrix, os.path.join(ARTIFACTS_DIR, "tfidf_matrix.joblib"))

    df_index = df[["id", "title"]].reset_index(drop=True)
    df_index.to_csv(os.path.join(ARTIFACTS_DIR, "movie_index.csv"), index=False)
    df.to_csv(os.path.join(ARTIFACTS_DIR, "movies.csv"), index=False)

    print(f"✅ Model trained on {tfidf_matrix.shape[0]} movies and artifacts saved.")
    return df_index.copy()

if __name__ == "__main__":
    train_model()