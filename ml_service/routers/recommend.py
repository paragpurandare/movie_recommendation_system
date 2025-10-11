from fastapi import APIRouter, HTTPException, Query
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import joblib

router = APIRouter(prefix="/recommend", tags=["Recommendations"])

# Load only movies.csv at startup
try:
    full_movies = pd.read_csv("artifacts/movies.csv")
    print(f"✅ Movie data loaded ({len(full_movies)} movies)")
except Exception as e:
    print("⚠️ Could not load movie data:", e)
    full_movies = None

def load_tfidf_artifacts():
    vectorizer = joblib.load("artifacts/tfidf_vectorizer.joblib")
    tfidf_matrix = joblib.load("artifacts/tfidf_matrix.joblib")
    return vectorizer, tfidf_matrix

@router.get("/movie/{id}")
def recommend_by_movie(id: int, top_n: int = 5):
    """Recommend top-N similar movies given a movie ID, with scaled similarity scores."""
    vectorizer, tfidf_matrix = load_tfidf_artifacts()
    if vectorizer is None or tfidf_matrix is None or full_movies is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    if id not in full_movies["id"].values:
        raise HTTPException(status_code=404, detail="Movie not found.")

    idx = full_movies.index[full_movies["id"] == id][0]
    cosine_sim = cosine_similarity(tfidf_matrix[idx:idx+1], tfidf_matrix).flatten()
    scaled_sim_scores = cosine_sim * 100

    similar_idx = scaled_sim_scores.argsort()[-top_n-1:][::-1]
    similar_idx = [i for i in similar_idx if i != idx][:top_n]

    recs = []
    for i in similar_idx:
        mid = int(full_movies.iloc[i]["id"])
        title = full_movies.iloc[i]["title"]
        sim = round(float(scaled_sim_scores[i]), 2)
        recs.append({"id": mid, "title": title, "similarity_score": sim})

    return {
        "input_movie": {"id": id, "title": full_movies.iloc[idx]["title"]},
        "recommendations": recs
    }

@router.get("/search")
def recommend_by_query(query: str = Query(..., min_length=2), top_n: int = 5):
    """Recommend top-N movies similar to a search query, with scaled similarity scores."""
    vectorizer, tfidf_matrix = load_tfidf_artifacts()
    if vectorizer is None or tfidf_matrix is None or full_movies is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    query_vec = vectorizer.transform([query.lower()])
    cosine_sim = cosine_similarity(query_vec, tfidf_matrix).flatten()
    scaled_sim_scores = cosine_sim * 100
    top_idx = scaled_sim_scores.argsort()[-top_n:][::-1]

    recs = []
    for i in top_idx:
        mid = int(full_movies.iloc[i]["id"])
        title = full_movies.iloc[i]["title"]
        sim = round(float(scaled_sim_scores[i]), 2)
        recs.append({"id": mid, "title": title, "similarity_score": sim})

    return {
        "query": query,
        "recommendations": recs
    }