# Movie Recommendation System

🎬 Personalized Movie Recommender  
Full-stack MERN app for movie rating and personalized recommendations.  
Features Auth, movie browse/search, and rating CRUD. Implements both Content-Based and Collaborative Filtering (KNN/Cosine Similarity).


- **This project covers the fundamentals of a full-stack MERN application for movie recommendations.**

-**Implemented:**
- User authentication (JWT, Google OAuth, Manual with Email and Password hashing)
- Movie browsing, Search
- Content-based recommendation engine (ML service)
- PostgreSQL database integration
- Modular Node.js wiht Express as backend with organized API routes
- Polished Vite/React frontend App with modern UI, Sorting, Pagination, Tailwind CSS
- Secure environment variable management
- Poetry-based Python ML Service
- Best practices: RESTful APIs, error handling, code modularity, environment configs

- Real-time Search - Instant search results
- Rate Limiting - API protection against abuse.
- Error Handling - Graceful error states and recovery
- Security - JWT authentication, input validation
---

## 1. Clone the Repository

```bash
git clone https://github.com/paragpurandare/movie_recommendation_system.git
cd movie_recommender
```

---

## 2. PostgreSQL Setup

### **Ubuntu/Debian/WSL**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### **macOS**
```bash
brew install postgresql
brew services start postgresql
```

### **Windows**
- Download and install from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- Start PostgreSQL service from pgAdmin or Windows Services

---

### **Create Database and Tables**

#### **Step 1: Connect to PostgreSQL**

- **Ubuntu/WSL/macOS:**
  ```bash
  sudo -u postgres psql
  ```
- **Windows (using psql):**
  - Open Command Prompt or PowerShell
  - Run:  
    ```bash
    psql -U postgres
    ```

#### **Step 2: Create Database and User**

```sql
CREATE DATABASE moviedb;
CREATE USER movieuser WITH PASSWORD 'pp191919';
GRANT ALL PRIVILEGES ON DATABASE moviedb TO movieuser;
\q
```

#### **Step 3: Connect to moviedb as movieuser**

```bash
psql -U movieuser -d moviedb -h localhost
```

#### **Step 4: Create Tables**

```sql
-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    google_id VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies Table
CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    overview TEXT,
    genre TEXT,
    original_language VARCHAR(10) NOT NULL,
    release_date DATE,
    vote_average DECIMAL(3,1),
    vote_count DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table
CREATE TABLE ratings (
    id INTEGER PRIMARY KEY,
    userId INTEGER REFERENCES users(id),
    movieId INTEGER REFERENCES movies(id),
    rating DECIMAL(2,1),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install


```

---

## 4. Backend Setup create set env variables

```bash
cd backend
touch env
npm install
```
- Create a `.env` file in `backend` directory:
  ```env
  # JWT secret (generate a strong random string, e.g. using `openssl rand -hex 64`)
JWT_SECRET=your-very-long-random-secret-key

# Upstash Redis credentials (get from https://upstash.com)
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
  ```

---


## 5. ML Service Setup

```bash
cd ml_service

# Install Poetry for Linux/macOS
curl -sSL https://install.python-poetry.org | python3 -

# Install Poetry on Windows
pip install poetry
```

```bash
# Install dependencies
poetry install

# If error with any missing dependency
poetry add package_name
```

### **Activate Poetry's venv**

```bash
poetry shell
# Or, if shell doesn't work:
poetry env info --path
source $(poetry env info --path)/bin/activate
```

---

## 6. Run ML Service

- No need to retrain model (artifacts included), but optional:
  ```bash
  python train/train_model.py
  ```

- Run FastAPI:
  ```bash
  uvicorn main:app --reload --port 8000
  ```

- Or, without activating shell:
  ```bash
  poetry run python train/train_model.py
  poetry run uvicorn main:app --reload --port 8000
  ```

---

## 7. Run All Services

- **Terminal 1 - Frontend**
  ```bash
  cd frontend
  npm run dev
  ```

- **Terminal 2 - Backend**
  ```bash
  cd backend
  npm start
  ```

- **Terminal 3 - ML Service**
  ```bash
  cd ml_service
  poetry shell
  uvicorn main:app --reload --port 8000
  ```

---

## 8. Access the App

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **ML Service:** http://localhost:8000

---

- **What’s Next / Future Plans**
- Collaborative Filtering: KNN-based collaborative filtering is planned for future releases.

- Cloud Migration: Plan to migrate PostgreSQL to a managed cloud service for scalability and remote access.

- Deployment:
- Docker and docker-compose for containerized multi-service deployment
- NginX for reverse proxying, load balancing, and handling concurrent requests

- Horizontal scaling for backend and ML service - Using Celery Architecture.
