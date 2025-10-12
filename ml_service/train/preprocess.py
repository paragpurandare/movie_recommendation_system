import pandas as pd

def load_and_clean_movies(df):
    """Load and clean movies data for model training."""
    
    df = df.dropna(subset=["id", "title"])

    # Fill missing values and ensure correct types
    for col in ["genre", "overview", "original_language", "release_date"]:
        df[col] = df.get(col, "").fillna("").astype(str)
    for col in ["popularity", "vote_average", "vote_count"]:
        df[col] = pd.to_numeric(df.get(col, 0), errors="coerce").fillna(0)

    df.drop_duplicates(subset=["id"], inplace=True)

    # Combine text for vectorizer input (Feature Engineering)
    df["tags"] = (
        df["genre"].str.lower().fillna("") + " " +
        df["overview"].str.lower().fillna("")
    )

    # Remove genre and overview columns after combining
    df = df.drop(columns=["genre", "overview"])

    print(f"✅ Cleaned dataset: {df.shape[0]} rows, {df.shape[1]} columns")
    return df