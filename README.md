# 💰 Saviko – AI-Powered Personal Finance Management System

> An AI-powered personal finance management application that helps users track expenses, scan receipts, categorize spending, and receive intelligent financial assistance.

## 🚀 Live Demo

🌐 [Try Saviko Live](https://saviko-ai-personal-finance-syatem.onrender.com)

---

## 📌 About the Project

Managing personal expenses manually can be time-consuming and difficult to organize.

*Saviko* is designed to simplify this process by combining traditional expense management with *Generative AI*.

Users can record their expenses, upload receipts, automatically extract expense information using AI, categorize their spending, and interact with an AI financial assistant.

The project focuses on building a practical *AI-powered full-stack application* rather than using AI as a standalone feature.

---

## 🎯 Problem Statement

Traditional expense tracking often requires users to:

- Manually enter every expense
- Categorize expenses themselves
- Organize receipt information
- Analyze spending patterns
- Search for financial advice separately

This can make financial management repetitive and time-consuming.

### 💡 Solution

Saviko combines *AI + expense management + analytics* into one application.

The system uses Google Gemini to automate parts of expense management and provide intelligent financial assistance.

---

## 🤖 AI Features

### 🧾 1. AI Receipt Scanner

Users can upload a receipt image.

The AI analyzes the receipt and extracts relevant information such as:

- Merchant / Shop name
- Purchase date
- Items
- Total amount
- Expense category

The extracted information can then be added directly as an expense.

### 🏷️ 2. Intelligent Expense Categorization

Saviko uses AI to help categorize expenses into relevant categories such as:

- Food
- Shopping
- Travel
- Entertainment
- Bills
- Other

This reduces the need for users to manually classify every transaction.

### 💬 3. AI Financial Assistant

The application provides an AI-powered assistant that users can interact with using natural language.

Example questions:

- "How can I reduce my monthly expenses?"
- "Where am I spending the most?"
- "Give me tips to save money."
- "Analyze my recent expenses."

The assistant provides personalized suggestions based on the available financial information.

---

## 📊 Expense Management & Analytics

Saviko provides an interactive dashboard where users can:

- Add expenses
- View expense history
- Track spending
- Analyze categories
- Monitor financial activity
- View spending insights

The dashboard helps users understand their financial habits more easily.

---

## 🔐 Authentication & Data Management

User authentication and data management are implemented using *Supabase*.

Each user can securely manage their own financial data within the application.

---

## 🏗️ Application Architecture

```text
                    User
                     │
                     ▼
          React + TypeScript Frontend
                     │
                     ▼
             Node.js + Express
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
   Google Gemini API         Supabase
          │                     │
          ▼                     ▼
     AI Processing       Database & Auth
          │
          ▼
   Financial Insights

🔄 Receipt Scanning Workflow
Upload Receipt
      ↓
Send Image to Backend
      ↓
Google Gemini AI
      ↓
Extract Receipt Information
      ↓
Identify Expense Category
      ↓
Display Extracted Details
      ↓
User Confirms "Add Expense"
      ↓
Store Expense in Supabase
      ↓
Display in Dashboard

✨ Key Features
🤖 Generative AI integration
🧾 AI-powered receipt scanning
🏷️ Intelligent expense categorization
💬 AI financial assistant
📊 Interactive expense dashboard
💰 Expense tracking
🔐 User authentication
☁️ Cloud database
🇮🇳 Indian Rupee (INR) support
🚀 Production deployment

🛠️ Technologies Used
Frontend
React.js
TypeScript
Vite
React Router
Recharts
Lucide React
Backend
Node.js
Express.js
TypeScript
AI
Google Gemini API
Database & Authentication
Supabase
Deployment
Render

🧠 AI Engineering Concepts Demonstrated
This project demonstrates practical experience with:
Generative AI
Large Language Model API integration
AI-powered information extraction
AI-based classification
Prompt-based application development
REST API integration
Backend AI service development
Database integration
Authentication
Cloud deployment

⚙️ Getting Started
Clone the Repository
git clone https://github.com/kajalakshmi-stack/saviko-ai-personal-finance-syatem.git
Navigate to the Project
cd saviko-ai-personal-finance-syatem
Install Dependencies
npm install
Configure Environment Variables
Create a .env file:
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key

Run Locally
npm run dev
🚀 Production Build
npm run build
npm start
