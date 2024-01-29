import { Db, ObjectId } from "mongodb";
import { getClient } from "../config";
import { Order, OrderInput } from "../types";

const COLLECTION_ORDERS = "orders";

export const getFastgenomics = async () => {
  const client = await getClient();
  const db: Db = client.db(process.env.MONGODB_DB_NAME);
  return db;
};

export const getOrders = async () => {
  const db: Db = await getFastgenomics();
  const data = (await db
    .collection(COLLECTION_ORDERS)
    .find()
    .toArray()) as Order[];
  return data;
};

export const postOrder = async (input: OrderInput) => {
  const db: Db = await getFastgenomics();
  const response = await db.collection(COLLECTION_ORDERS).insertOne(input);
  // input + insertedId -> output
  const { ...data } = {
    ...input,
    _id: response.insertedId as ObjectId,
  };
  return data as Order;
};
