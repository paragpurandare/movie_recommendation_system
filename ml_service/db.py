import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Get DATABASE_URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"}  # required for Render / cloud Postgres
)

# Test connection
try:
    with engine.connect() as conn:
        print("✅ Connected to PostgreSQL database.")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    engine = None

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
