import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient | null> = Promise.resolve(null);

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient | null> | undefined;
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // Graceful fallback when MONGODB_URI is not set yet
  clientPromise = Promise.resolve(null);
}

export async function getDatabase(): Promise<Db | null> {
  try {
    const c = await clientPromise;
    if (!c) return null;
    const dbName = process.env.MONGODB_DB || "santosh_group";
    return c.db(dbName);
  } catch (err) {
    console.warn("MongoDB connection warning:", err);
    return null;
  }
}

export default clientPromise;
