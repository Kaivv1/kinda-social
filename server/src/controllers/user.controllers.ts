import { NextFunction, Request, Response } from "express";
import { validatePayload } from "../helpers/validatePayload.js";
import { registerSchema } from "../helpers/schemas/user.schema.js";

export async function register(
  req: Request<unknown, unknown, RegisterPayload, unknown>,
  res: Response,
  next: NextFunction
) {
  validatePayload<RegisterPayload>(req.body, registerSchema);

  res.status(200).json("request recieved");
}
