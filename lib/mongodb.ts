import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getDatabase(): Promise<Db | null> {
  if (!uri) return null;

  try {
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch((err) => {
        // Reset on failure so subsequent requests can retry
        clientPromise = null;
        client = null;
        throw err;
      });
    }

    const c = await clientPromise;
    const dbName = process.env.MONGODB_DB || "santosh_group";
    return c.db(dbName);
  } catch (err) {
    console.warn("MongoDB connection warning (falling back to local storage):", err);
    return null;
  }
}

export default clientPromise;
