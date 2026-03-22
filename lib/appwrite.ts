import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.givmitech.quickbyt",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: name,
    });

    if (!newAccount) {
      throw new Error("User creation failed");
    }
    if (newAccount) {
      await signIn({ email, password });
      const avatarUrl = avatars.getInitialsURL(name);

      return await databases.createDocument({
        databaseId: appwriteConfig.databaseId,
        collectionId: appwriteConfig.userCollectionId,
        documentId: ID.unique(),
        data: {
          name,
          email,
          accountId: newAccount.$id,
          avatar: avatarUrl,
        },
      });
    }
  } catch (error) {
    throw new Error("Failed to create user: " + error);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    return session;
  } catch (error) {
    throw new Error("Failed to sign in: " + error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    // Guests (no active session) are expected during cold starts.
    const appwriteError = e as { code?: number; message?: string };
    const isUnauthenticated =
      appwriteError?.code === 401 ||
      appwriteError?.message?.includes("missing scopes") ||
      appwriteError?.message?.includes("role: guests");

    if (isUnauthenticated) return null;

    throw new Error(String(e));
  }
};
