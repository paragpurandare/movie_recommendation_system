import os
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from train.preprocess import load_and_clean_movies

DATA_PATH = "./data/raw_movies.csv"
ARTIFACTS_DIR = "artifacts"

def train_model():
    df = load_and_clean_movies(DATA_PATH)

    # Use CountVectorizer (can switch to TfidfVectorizer if needed)
    vectorizer = CountVectorizer(stop_words="english", max_features=10000)
    tfidf_matrix = vectorizer.fit_transform(df["tags"].values.astype('U'))  # keep as sparse

    # Save artifacts
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    joblib.dump(vectorizer, os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.joblib"))
    joblib.dump(tfidf_matrix, os.path.join(ARTIFACTS_DIR, "tfidf_matrix.joblib"))

    # Save simplified index for lookups
    df_index = df[["id", "title"]].reset_index(drop=True)
    df_index.to_csv(os.path.join(ARTIFACTS_DIR, "movie_index.csv"), index=False)
    df.to_csv(os.path.join(ARTIFACTS_DIR, "movies.csv"), index=False)

    print(f"✅ Model trained on {tfidf_matrix.shape[0]} movies and artifacts saved.")
    return df_index.copy()

if __name__ == "__main__":
    train_model()