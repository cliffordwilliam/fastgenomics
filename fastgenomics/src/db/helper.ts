import { Response } from "./types";
import { z } from "zod";

export const handleError = (err: unknown): Response<never> => {
  // 400 zod
  if (err instanceof z.ZodError) {
    const zodErr = err as z.ZodError;
    const errPath = zodErr.issues[0].path[0];
    const errMessage = zodErr.issues[0].message;
    return {
      status: 400,
      error: `${errPath} - ${errMessage}`,
    };
  }
  // 500
  return {
    status: 500,
    message: "Internal server error",
  };
};
