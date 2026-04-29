# 💰 Finance Tracker

A beautiful, offline-first personal finance tracking app built with **Next.js** and **Appwrite**.

![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

---

## ✨ Features

- **🔒 Offline-First** — Track your income, expenses, and budget without creating an account. All data is stored locally in your browser.
- **☁️ Cloud Sync** — Sign in anytime to back up your local data to Appwrite and access it from anywhere.
- **📊 Smart Dashboard** — Real-time balance, income, and expense summaries with a visual budget progress bar.
- **🏷️ Categories** — Organize transactions with predefined categories (Salary, Food, Rent, etc.).
- **📱 Responsive** — Clean, modern UI that works on desktop and mobile.
- **🚀 Zero Config** — Just clone, install, and run.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- An [Appwrite Cloud](https://cloud.appwrite.io/) account

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/finance-tracker-ai.git
cd finance-tracker-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Appwrite

Create a project in [Appwrite Console](https://cloud.appwrite.io/) and update `lib/appwrite.js` with your credentials:

```js
const client = new Client()
    .setEndpoint("https://YOUR_REGION.cloud.appwrite.io/v1")
    .setProject("YOUR_PROJECT_ID");
```

Run the setup script to create the database and collections:

```bash
APPWRITE_API_KEY=your_api_key node scripts/setup-appwrite.js
```

> Get your API Key from **Appwrite Console → API Keys → Create API Key** (scopes: `databases.write`).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start tracking! 🎉

---

## 🏗️ Architecture

```
app/
├── components/
│   ├── Dashboard.js         # Main dashboard with tabs
│   ├── AddTransaction.js    # Add income/expense form
│   ├── TransactionList.js   # List with delete action
│   ├── BudgetManager.js     # Set monthly budget
│   └── AuthForm.js          # Login/register modal
├── page.js                  # Entry point
├── layout.js                # Root layout
lib/
├── appwrite.js              # Appwrite client config
└── localStorage.js          # Offline data persistence
scripts/
└── setup-appwrite.js        # Database & collections setup
```

---

## 📸 Screenshots

| Dashboard | Auth Modal |
|-----------|------------|
| Track income, expenses, and budget in one place | Sign in or register to sync to the cloud |

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

---

## 📦 Deploy

### Appwrite Sites (Static Export)

The app is pre-configured for static export:

```bash
npm run build
```

Then deploy the `dist/` folder to [Appwrite Sites](https://appwrite.io/docs/products/sites):

```bash
appwrite sites create --site-id finance-tracker --name "Finance Tracker"
appwrite sites create-deployment --site-id finance-tracker --code dist
```

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

Made with ❤️ using [Appwrite](https://appwrite.io/) and [Next.js](https://nextjs.org/)
