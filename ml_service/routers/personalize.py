from fastapi import APIRouter, HTTPException, Query
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import joblib

router = APIRouter(prefix="/personalize", tags=["Recommendations"])