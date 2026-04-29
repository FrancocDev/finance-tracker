import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint("https://sfo.cloud.appwrite.io/v1")
    .setProject("finance-ai");

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = 'finance-db';
const COLLECTIONS = {
  INCOMES: 'incomes',
  EXPENSES: 'expenses',
  BUDGETS: 'budgets',
};

export { client, account, databases, DATABASE_ID, COLLECTIONS, ID, Query };
