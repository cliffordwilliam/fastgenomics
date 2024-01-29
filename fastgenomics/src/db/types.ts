import { ObjectId } from "mongodb";
import { z } from "zod";

// REST STYLE
export type Response<T> = {
  status: number;
  message?: string;
  data?: T;
  error?: string;
};

// PUBLICATIONS
export type Publication = {
  _id: ObjectId;
  year: string;
  title: string;
  totalCitation: string;
  recentCitation: string;
  author: string;
  doi: string;
  linkToScholar: string;
  publications: string;
};
export const ZodPublicationInput = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  totalCitation: z.string().min(1),
  recentCitation: z.string().min(1),
  author: z.string().min(1),
  doi: z.string().min(1),
  linkToScholar: z.string().min(1),
  publications: z.string().min(1),
});
export type PublicationInput = Omit<Publication, "_id">;

// ORDER
export type Order = {
  _id: ObjectId;
  name: string;
  phoneNumber: string;
  email: string;
  serviceDescription: string;
};
export const ZodOrderInput = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().min(1),
  serviceDescription: z.string().min(1),
});
export type OrderInput = Omit<Order, "_id">;

// PRODUCT
export type Product = {
  _id: ObjectId;
  name: string;
  description: string;
};
export const ZodProductInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
export type ProductInput = Omit<Product, "_id">;
