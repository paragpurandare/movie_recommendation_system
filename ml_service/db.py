from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://movieuser:pp191919@localhost/moviedb"

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print("✅ Connected to PostgreSQL database.")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    engine = None

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)