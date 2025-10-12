from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommend


app = FastAPI(title="Movie Recommender ML Service", version="1.0")

# Enable CORS for all origins (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router)

@app.get("/")
def root():
    return {"message": "Welcome to Movie Recommender ML Service!"}