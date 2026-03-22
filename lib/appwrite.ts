import {
  CreateUserParams,
  GetMenuParams,
  SignInParams,
  UpdateUserProfileParams,
} from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
// Update user profile in Appwrite
export const updateUserProfile = async (params: UpdateUserProfileParams) => {
  try {
    // Defensive: get current user document
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No authenticated user");
    const userDocs = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });
    if (!userDocs.documents.length) throw new Error("User document not found");
    const userDoc = userDocs.documents[0];
    // Update document
    const updated = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userDoc.$id,
      params,
    );
    return updated;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update profile");
  }
};

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.givmitech.quickbyt",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  categoriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
  customizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
  menuCustomizationsCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
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

    const currentUser = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.userCollectionId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

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

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    // Defensive: ensure collectionId is present and not undefined
    if (!appwriteConfig.menuCollectionId) {
      throw new Error("Missing menuCollectionId in appwriteConfig");
    }

    const menus = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.menuCollectionId,
      queries: queries,
    });

    return menus.documents;
  } catch (e) {
    console.error("Failed to fetch menu items:", e);
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    // Defensive: ensure collectionId is present and not undefined
    if (!appwriteConfig.categoriesCollectionId) {
      throw new Error("Missing categoriesCollectionId in appwriteConfig");
    }
    const categories = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId,
      collectionId: appwriteConfig.categoriesCollectionId,
    });

    return categories.documents;
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    throw new Error(e as string);
  }
};

export const logout = async () => {
  await account.deleteSession("current");
};
