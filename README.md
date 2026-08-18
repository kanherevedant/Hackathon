# Customer Retention Through Analytics

An end-to-end customer retention and churn prediction system that uses Machine Learning, FastAPI, Express.js, React.js, and MySQL to identify customers who are at risk of leaving and recommend appropriate retention strategies.

---

## 📌 Project Overview

Customer churn is a major challenge for businesses, especially in the banking and financial services sector.

This project analyzes customer behavior and predicts the probability that a customer may churn.

The system provides:

- Customer management
- Customer search
- Customer risk analysis
- Churn probability prediction
- Risk classification
- Explainable risk factors
- Recommended retention actions
- Customer analytics dashboard
- Authentication and protected routes

The application combines a React frontend, Express.js backend, FastAPI machine-learning service, and MySQL database.

---

# 🚀 Features

## 👤 Customer Management

- View all customers
- Search customers
- View individual customer profiles
- View customer information and behavior

## 🤖 Churn Prediction

For a selected customer, the system predicts:

- Churn probability
- Risk level
- Risk factors
- Recommended retention actions

Example:

```text
Customer ID: C100001

Churn Probability: 53.8%

Risk Level: Medium

Risk Factors:
- Low customer satisfaction
- Reduced transaction activity
- Customer is not enrolled in loyalty program

Recommended Actions:
- Offer a personalized retention benefit
- Contact the customer
- Encourage loyalty program enrollment
```

## 📊 Analytics

The dashboard provides insights into:

- Customer distribution
- Churn distribution
- Customer segments
- Risk levels
- Behavioral trends

## 🔐 Authentication

The application includes:

- User registration
- User login
- JWT authentication
- Protected routes

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │      Port: 5173      │
                    └──────────┬───────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌──────────────────────┐
                    │     Express.js       │
                    │      Backend         │
                    │      Port: 5000      │
                    └───────┬───────┬──────┘
                            │       │
                            │       │ Prediction Request
                            │       ▼
                            │  ┌──────────────────────┐
                            │  │       FastAPI        │
                            │  │   ML Prediction API  │
                            │  │      Port: 8000      │
                            │  └──────────┬───────────┘
                            │             │
                            │             ▼
                            │  ┌──────────────────────┐
                            │  │   Trained ML Model   │
                            │  │   churn_model.pkl    │
                            │  └──────────────────────┘
                            │
                            ▼
                    ┌──────────────────────┐
                    │        MySQL         │
                    │       Database       │
                    └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Recharts
- Vite

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- FastAPI
- Uvicorn
- Joblib

## Database

- MySQL

## Development Tools

- VS Code
- Git
- GitHub
- Postman

---

# 📁 Project Structure

```text
Hackathon/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── CustomerCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RiskBadge.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── CustomerDetails.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Predictions.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── customerService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── ml/
│   │
│   ├── data/
│   │   └── CustomerDataset.csv
│   │
│   ├── models/
│   │   └── churn_model.pkl
│   │
│   ├── notebooks/
│   │   └── 01_data_exploration.ipynb
│   │
│   ├── analyze_thresholds.py
│   ├── main.py
│   ├── predict.py
│   ├── retention.py
│   ├── test_customer.py
│   ├── train_model.py
│   └── requirements.txt
│
├── start.bat
└── README.md
```

> `node_modules`, Python cache files, environment files, and other generated files should not be committed to GitHub.

---

# 💻 Requirements

Before running the project, install:

### 1. Node.js

Node.js is required for the frontend and backend.

Check installation:

```bash
node --version
npm --version
```

### 2. Python

Python 3.10+ is recommended.

Check:

```bash
python --version
```

### 3. MySQL

MySQL Server is required for storing customer and application data.

Check that MySQL is running before starting the backend.

### 4. Git

Check:

```bash
git --version
```

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd Hackathon
```

---

# 🗄️ Database Setup

## 1. Start MySQL

Make sure your MySQL server is running.

You can use:

- MySQL Workbench
- XAMPP
- MySQL Server

## 2. Create the Database

Open MySQL and create the project database.

Example:

```sql
CREATE DATABASE customer_retention;
```

Select the database:

```sql
USE customer_retention;
```

## 3. Create the Required Tables

Run the SQL schema provided in the backend/database setup.

The main customer table should contain the customer information used by the application.

The ML dataset contains fields such as:

```text
Customer_ID
Age
Gender
City_Tier
Employment_Type
Customer_Segment
Tenure_Months
Monthly_Income
Account_Balance
Credit_Score
Product_Type
Products_Used
Preferred_Channel
Loyalty_Member
Transactions_Last_3M
Transactions_Previous_3M
Transaction_Change_Pct
Avg_Transaction_Value
App_Usage_Hours_Last_3M
App_Usage_Hours_Previous_3M
App_Usage_Change_Pct
Last_Login_Days_Ago
Customer_Support_Calls
Complaints
Satisfaction_Score
Offers_Used
Balance_Change_Pct
Churn
```

---

# ⚙️ Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the required environment file:

```text
.env
```

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=customer_retention
DB_PORT=3306

JWT_SECRET=YOUR_SECRET_KEY

ML_SERVICE_URL=http://127.0.0.1:8000
```

Replace the values according to your local MySQL configuration.

Start the backend:

```bash
npm start
```

The backend should run on:

```text
http://localhost:5000
```

---

# 🤖 Machine Learning Setup

Open a new terminal:

```bash
cd ml
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

The project already contains the trained model:

```text
ml/models/churn_model.pkl
```

If you want to retrain the model:

```bash
python train_model.py
```

Start the FastAPI service:

```bash
python -m uvicorn main:app --reload
```

The ML API will run on:

```text
http://127.0.0.1:8000
```

FastAPI documentation will be available at:

```text
http://127.0.0.1:8000/docs
```

---

# 🌐 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ▶️ Running the Complete Project

The project consists of three services:

| Service | Port |
|---|---:|
| React Frontend | 5173 |
| Express Backend | 5000 |
| FastAPI ML Service | 8000 |
| MySQL | 3306 |

Normally you need to start all three application services.

### Option 1 — Start manually

Terminal 1:

```bash
cd backend
npm start
```

Terminal 2:

```bash
cd ml
python -m uvicorn main:app --reload
```

Terminal 3:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# ⚡ One-Click Local Startup

The project also contains:

```text
start.bat
```

from the project root.

Running:

```text
start.bat
```

starts:

- Express backend
- FastAPI ML service
- React frontend

Make sure:

- MySQL is running
- Node.js is installed
- Python is installed
- Python dependencies are installed
- Node dependencies are installed

before using `start.bat`.

---

# 🔌 API Overview

## Authentication

### Register

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

---

## Customers

### Get all customers

```http
GET /api/customers
```

### Get customer by ID

```http
GET /api/customers/:id
```

### Get customer risk

```http
GET /api/customers/:id/risk
```

The risk endpoint communicates with the FastAPI ML service and returns the prediction results.

---

# 🤖 Machine Learning Pipeline

The ML pipeline follows this process:

```text
Customer Dataset
       ↓
Data Preprocessing
       ↓
Feature Selection
       ↓
Categorical Encoding
       ↓
Train/Test Split
       ↓
Model Training
       ↓
Model Evaluation
       ↓
Hyperparameter Tuning
       ↓
Trained Model
       ↓
FastAPI Prediction Service
       ↓
Express Backend
       ↓
React Frontend
```

The model predicts the probability of customer churn.

---

# 📊 Prediction Output

The ML service returns information such as:

```json
{
    "Customer_ID": "C100001",
    "prediction": {
        "churn_probability": 0.5383,
        "risk_level": "Medium",
        "risk_factors": [
            "Low customer satisfaction",
            "Reduced transaction activity"
        ],
        "recommended_actions": [
            "Offer a personalized retention benefit",
            "Contact the customer"
        ]
    }
}
```

---

# 🧠 Risk Classification

The predicted churn probability is converted into a risk category.

```text
Low Risk
    ↓
Lower probability of churn

Medium Risk
    ↓
Moderate probability of churn

High Risk
    ↓
Higher probability of churn
```

The system also analyzes customer behavior to identify potential reasons for churn.

---

# 🔍 Explainable AI

Instead of displaying only a prediction, the application explains **why a customer may be at risk**.

Examples of risk factors include:

- Low satisfaction score
- Reduced transaction activity
- Reduced application usage
- Long period since last login
- Multiple complaints
- Multiple customer support calls
- No loyalty membership

The system then maps these factors to recommended retention actions.

---

# 📁 Dataset

The project uses a synthetic customer dataset created for the hackathon.

File:

```text
ml/data/CustomerDataset.csv
```

Dataset size:

```text
10,000 customers
28 columns
```

The dataset contains customer demographic, financial, behavioral, engagement, satisfaction, and churn information.

---

# 🔐 Security

Authentication is implemented using JWT.

Protected backend routes require a valid token.

The frontend stores the authentication token and sends it with protected API requests.

Example:

```http
Authorization: Bearer <token>
```

---

# 🧪 Testing

The ML service can be tested using:

```text
ml/test_customer.py
```

FastAPI also provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

You can use the Swagger interface to test prediction endpoints.

---

# 🐛 Common Problems

## Backend does not start

Check whether port `5000` is already being used.

```bash
netstat -ano | findstr :5000
```

---

## ML service does not start

Make sure the virtual environment is activated:

```bash
venv\Scripts\activate
```

Then:

```bash
pip install -r requirements.txt
```

Start again:

```bash
python -m uvicorn main:app --reload
```

---

## Database connection error

Check:

```text
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
```

in your `.env` file.

Also make sure MySQL is running.

---

## Frontend cannot connect to backend

Make sure the backend is running:

```text
http://localhost:5000
```

Also check the API URLs inside:

```text
frontend/src/services/
```

---

## Prediction is not working

Make sure both services are running:

```text
Express Backend
        ↓
http://localhost:5000

FastAPI ML Service
        ↓
http://127.0.0.1:8000
```

The Express backend communicates with the ML service to generate predictions.

---

# 👨‍💻 My Contribution

My primary responsibilities in this project included:

### Machine Learning

- Prepared the customer churn dataset
- Performed data preprocessing
- Selected relevant features
- Trained the churn prediction model
- Evaluated model performance
- Performed threshold analysis
- Implemented churn probability prediction
- Developed risk-level classification
- Implemented explainable risk factors
- Created recommended retention actions
- Integrated the trained model with FastAPI

### Backend

- Developed REST APIs using Express.js
- Implemented customer-related APIs
- Implemented authentication and JWT-based protected routes
- Connected the backend with MySQL
- Integrated Express.js with the FastAPI ML service
- Implemented customer risk prediction API

### Integration

```text
React
  ↓
Express.js
  ↓
FastAPI
  ↓
Machine Learning Model
```

---

# 👥 Project Team

This project was developed as part of a hackathon project.

### Team Size

```text
8 Members
```

Each member contributed to different parts of the project including frontend, backend, machine learning, analytics, and presentation.

---

# 🔮 Future Improvements

Possible future improvements include:

- Real-time customer behavior monitoring
- Automated retention campaigns
- Email/SMS notifications
- Advanced ML models
- SHAP-based model explanations
- Model monitoring
- Customer lifetime value prediction
- Automated retraining pipeline
- Cloud deployment
- Role-based access control
- Advanced analytics dashboard

---

# 📌 Project Objective

The primary objective of the project is to help organizations identify customers who are likely to churn **before they leave**, understand the reasons behind their risk, and take proactive retention actions.

```text
Customer Data
      ↓
Behavior Analysis
      ↓
Churn Prediction
      ↓
Risk Identification
      ↓
Explainable Factors
      ↓
Retention Recommendations
      ↓
Customer Retention
```

---

# ⭐ Conclusion

Customer Retention Through Analytics demonstrates how Machine Learning and full-stack development can be combined to build a practical customer retention solution.

The system integrates:

```text
React.js
+
Express.js
+
FastAPI
+
Machine Learning
+
MySQL
+
JWT Authentication
```

to provide an end-to-end customer churn prediction and retention platform.