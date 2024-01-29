import { Db, ObjectId } from "mongodb";
import { getClient } from "../config";
import { Product, ProductInput } from "../types";

const COLLECTION_PRODUCTS = "products";

export const getFastgenomics = async () => {
  const client = await getClient();
  const db: Db = client.db(process.env.MONGODB_DB_NAME);
  return db;
};

export const getProducts = async () => {
  const db: Db = await getFastgenomics();
  const data = (await db
    .collection(COLLECTION_PRODUCTS)
    .find()
    .toArray()) as Product[];
  return data;
};

export const postProduct = async (input: ProductInput) => {
  const db: Db = await getFastgenomics();
  const response = await db.collection(COLLECTION_PRODUCTS).insertOne(input);
  // input + insertedId -> output
  const { ...data } = {
    ...input,
    _id: response.insertedId as ObjectId,
  };
  return data as Product;
};
