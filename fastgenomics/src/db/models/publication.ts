import { Db, ObjectId } from "mongodb";
import { getClient } from "../config";
import { Publication, PublicationInput } from "../types";

const COLLECTION_PUBLICATIONS = "publications";

export const getFastgenomics = async () => {
  const client = await getClient();
  const db: Db = client.db(process.env.MONGODB_DB_NAME);
  return db;
};

export const getPublications = async () => {
  const db: Db = await getFastgenomics();
  const data = (await db
    .collection(COLLECTION_PUBLICATIONS)
    .find()
    .toArray()) as Publication[];
  return data;
};

export const postPublication = async (input: PublicationInput) => {
  const db: Db = await getFastgenomics();
  const response = await db
    .collection(COLLECTION_PUBLICATIONS)
    .insertOne(input);
  // input + insertedId -> output
  const { ...data } = {
    ...input,
    _id: response.insertedId as ObjectId,
  };
  return data as Publication;
};
