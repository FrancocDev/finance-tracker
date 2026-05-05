# 💰 Finance Tracker

A beautiful, offline-first personal finance tracking app with **AI-powered insights**, built with **Next.js** and **Appwrite**.

![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![AI SDK](https://img.shields.io/badge/AI%20SDK-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- **🔒 Offline-First** — Track your income, expenses, and budget without creating an account. All data is stored locally in your browser.
- **☁️ Cloud Sync** — Sign in anytime to back up your local data to Appwrite and access it from anywhere.
- **🤖 AI Quick Add** — Describe transactions in plain English (e.g., "Starbucks coffee $5.50 yesterday") and let AI parse and categorize them automatically.
- **📊 AI Report** — Generate AI-powered financial insights and spending analysis with natural language summaries.
- **📊 Smart Dashboard** — Real-time balance, income, and expense summaries with a visual budget progress bar.
- **🏷️ Categories** — Organize transactions with predefined categories (Salary, Food, Rent, etc.).
- **📱 Responsive** — Clean, modern UI that works on desktop and mobile.
- **🚀 Zero Config** — Just clone, install, and run.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An [Appwrite Cloud](https://cloud.appwrite.io/) account
- A [Groq](https://groq.com/) API key (free tier available)

### 1. Clone the repo

```bash
git clone https://github.com/FrancocDev/finance-tracker.git
cd finance-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

> Get your free Groq API key at [console.groq.com](https://console.groq.com/keys)

### 4. Configure Appwrite

Create a project in [Appwrite Console](https://cloud.appwrite.io/) and update `lib/appwrite.ts` with your credentials:

```ts
const client = new Client()
    .setEndpoint("https://YOUR_REGION.cloud.appwrite.io/v1")
    .setProject("YOUR_PROJECT_ID");
```

Run the setup script to create the database and collections:

```bash
APPWRITE_API_KEY=your_api_key node scripts/setup-appwrite.js
```

> Get your API Key from **Appwrite Console → API Keys → Create API Key** (scopes: `databases.write`).

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start tracking! 🎉

---

## 🏗️ Architecture

```
app/
├── api/
│   └── ai/
│       ├── quick-add/route.ts    # AI natural language transaction parser
│       └── report/route.ts       # AI financial report generator
├── components/
│   ├── Dashboard.tsx             # Main dashboard with tabs
│   ├── AddTransaction.tsx        # Add income/expense form
│   ├── AIQuickAdd.tsx            # AI-powered natural language input
│   ├── AIReport.tsx              # AI-generated financial insights
│   ├── TransactionList.tsx       # List with delete action
│   ├── BudgetManager.tsx         # Set monthly budget
│   └── AuthForm.tsx              # Login/register modal
├── page.tsx                      # Entry point
└── layout.tsx                    # Root layout
lib/
├── appwrite.ts                   # Appwrite client config
├── auth-client.ts                # Client-side auth helpers
├── auth-server.ts                # Server-side auth verification
├── rate-limit.ts                 # API rate limiting
├── localStorage.ts               # Offline data persistence
└── types.ts                      # TypeScript types
scripts/
└── setup-appwrite.js             # Database & collections setup
```

---

## 🤖 AI Features

### ✨ AI Quick Add

Type transactions in natural language and AI will automatically:
- Classify as income or expense
- Extract amount and date
- Categorize (Food, Transport, Salary, etc.)
- Generate a clean description

**Examples:**
- "Starbucks coffee $5.50 yesterday"
- "Monthly salary $3000 on the 1st"
- "Uber ride to airport $45 last Tuesday"

### 📊 AI Report

Select a date range and get AI-generated insights including:
- Income vs expense summary
- Top spending categories
- Budget status and remaining
- Actionable financial recommendations

> **Note:** AI features require authentication and are rate-limited (20 quick-adds/hour, 5 reports/hour).

---

## 📸 Screenshots

| Dashboard | AI Quick Add | AI Report |
|-----------|-------------|-----------|
| Track income, expenses, and budget | Type naturally, AI parses everything | Get AI-powered financial insights |

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | [React](https://react.dev/) 19 |
| Backend | [Appwrite](https://appwrite.io/) |
| Auth | Appwrite Account |
| Database | Appwrite Databases |
| Storage | `localStorage` (offline) |
| AI | [AI SDK](https://sdk.vercel.ai/) + [Groq](https://groq.com/) |
| Models | Llama 3.1 8B (quick-add), Llama 3.3 70B (reports) |

---

## 📦 Deploy

### Vercel (Recommended)

This app uses Next.js API routes and requires a Node.js runtime.

```bash
vercel --prod
```

**Required environment variables on Vercel:**
- `GROQ_API_KEY` — Your Groq API key

**CORS Setup:**
Add your Vercel domain to Appwrite Platforms:
1. Appwrite Console → Overview → Platforms → Add Platform → Web App
2. Enter your Vercel hostname (e.g., `finance-tracker-xxx.vercel.app`)

---

## 🗄️ Database Schema

### Collections

| Collection | Fields |
|------------|--------|
| `incomes` | `amount` (double), `description` (string), `category` (string), `date` (datetime), `userId` (string) |
| `expenses` | `amount` (double), `description` (string), `category` (string), `date` (datetime), `userId` (string) |
| `budgets` | `amount` (double), `period` (string), `month` (string), `userId` (string) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

[MIT](LICENSE)

---

Made with ❤️ using [Appwrite](https://appwrite.io/), [Next.js](https://nextjs.org/), and [Groq](https://groq.com/)
