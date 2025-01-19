import {
  Client,
  Account,
  ID,
  Avatars,
  Models,
  Databases,
  Query,
} from "react-native-appwrite";

export const config = {
  platform: "com.juvie.aora",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID ?? "",
  usersCollectionId: process.env.APPWRITE_DB_CL_ID_USERS ?? "",
  videosCollectionId: process.env.APPWRITE_DB_CL_ID_VIDEOS,
  storageId: process.env.APPWRITE_BUCKET_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
): Promise<void> => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<Models.Session | undefined> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Safely use the message property
    } else {
      throw new Error(String(error)); // Handle non-Error types
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();
    return currentUser.documents[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Safely use the message property
    } else {
      throw new Error(String(error)); // Handle non-Error types
    }
  }
};
