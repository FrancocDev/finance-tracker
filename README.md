# 💰 Finance Tracker

A beautiful, offline-first personal finance tracking app with **TypeSafe Jev-powered insights**, built with **Next.js** and **Appwrite**.

![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeSafe](https://img.shields.io/badge/TypeSafe%20Jev-000000?style=for-the-badge)

---

## ✨ Features

- **🔒 Offline-First** — Track your income, expenses, and budget without creating an account. All data is stored locally in your browser.
- **☁️ Cloud Sync** — Sign in anytime to back up your local data to Appwrite and access it from anywhere.
- **🤖 Jev Quick Add** — Describe transactions in plain English (e.g., "Starbucks coffee $5.50 yesterday") and let Jev classify them with typed decisions.
- **📊 Jev Report** — Combine deterministic financial metrics with Jev's typed spending signals and confidence scores.
- **📊 Smart Dashboard** — Real-time balance, income, and expense summaries with a visual budget progress bar.
- **🏷️ Categories** — Organize transactions with predefined categories (Salary, Food, Rent, etc.).
- **📱 Responsive** — Clean, modern UI that works on desktop and mobile.
- **🚀 Zero Config** — Just clone, install, and run.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- An [Appwrite Cloud](https://cloud.appwrite.io/) account
- A [TypeSafe](https://typesafe.ai/) API key

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
TYPESAFE_API_KEY=your_typesafe_api_key_here
# Optional: defaults to jev-latest
TYPESAFE_DEFAULT_MODEL=jev-latest
```

> Get your TypeSafe API key from the [TypeSafe dashboard](https://console.typesafe.ai/).

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
│       ├── quick-add/route.ts    # Jev classifier with deterministic extraction
│       └── report/route.ts       # Jev signals plus deterministic financial report
├── components/
│   ├── Dashboard.tsx             # Main dashboard with tabs
│   ├── AddTransaction.tsx        # Add income/expense form
│   ├── AIQuickAdd.tsx            # Jev-powered natural language input
│   ├── AIReport.tsx              # Jev-powered financial insights
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

## 🤖 TypeSafe Jev Features

### ✨ Jev Quick Add

Type transactions in natural language and the app will:
- Classify as income or expense
- Extract amount and date
- Ask Jev for a typed category decision (Food, Transport, Salary, etc.)
- Keep a clean deterministic description from the original text

**Examples:**
- "Starbucks coffee $5.50 yesterday"
- "Monthly salary $3000 on the 1st"
- "Uber ride to airport $45 last Tuesday"

### 📊 Jev Report

Select a date range and get a report including:
- Income vs expense summary
- Top spending categories
- Budget status and remaining
- Jev spending-pressure, cash-flow, budget-risk, and savings-opportunity signals
- Confidence scores for typed Jev decisions

> **Note:** Jev features require authentication and are rate-limited (20 quick-adds/hour, 5 reports/hour). Jev returns typed decisions rather than free-form text, so report prose is assembled from code and financial metrics.

---

## 📸 Screenshots

| Dashboard | Jev Quick Add | Jev Report |
|-----------|-------------|-----------|
| Track income, expenses, and budget | Type naturally, Jev classifies it | Get typed Jev financial signals |

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
| AI | [TypeSafe JavaScript SDK](https://docs.typesafe.ai/sdk/javascript) |
| Model | Jev (`jev-latest`) |

---

## 📦 Deploy

### Vercel (Recommended)

This app uses Next.js API routes and requires a Node.js runtime.

```bash
vercel --prod
```

**Required environment variables on Vercel:**
- `TYPESAFE_API_KEY` — Your TypeSafe API key
- `TYPESAFE_DEFAULT_MODEL` — Optional TypeSafe model override (defaults to `jev-latest`)

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

Made with ❤️ using [Appwrite](https://appwrite.io/), [Next.js](https://nextjs.org/), and [TypeSafe](https://typesafe.ai/)
