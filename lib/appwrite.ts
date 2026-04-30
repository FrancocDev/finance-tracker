import { Client, Account, Databases, ID, Query } from "appwrite";
import type { Databases as DatabasesType, Account as AccountType, Client as ClientType } from "appwrite";

const client: ClientType = new Client()
    .setEndpoint("https://sfo.cloud.appwrite.io/v1")
    .setProject("finance-ai");

const account: AccountType = new Account(client);
const databases: DatabasesType = new Databases(client);

const DATABASE_ID = 'finance-db';
const COLLECTIONS = {
  INCOMES: 'incomes',
  EXPENSES: 'expenses',
  BUDGETS: 'budgets',
} as const;

export { client, account, databases, DATABASE_ID, COLLECTIONS, ID, Query };
