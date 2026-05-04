import { Client, Account } from "node-appwrite";

const APPWRITE_ENDPOINT = "https://sfo.cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "finance-ai";

export async function getAuthenticatedUser(request: Request) {
  const sessionToken = request.headers.get("X-Appwrite-Session");

  if (!sessionToken) {
    return null;
  }

  try {
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT)
      .setSession(sessionToken);

    const account = new Account(client);
    const user = await account.get();
    return user;
  } catch {
    return null;
  }
}
