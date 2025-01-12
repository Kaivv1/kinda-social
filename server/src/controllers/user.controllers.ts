import { NextFunction, Request, Response } from "express";
import { validatePayload } from "../helpers/validatePayload.js";
import { loginSchema, registerSchema } from "../schemas/user.schemas.js";
import * as db from "../db/db.js";
import { v4 as uuid } from "uuid";
import { createError } from "../errorHandler.js";
import bcryptjs from "bcryptjs";
import * as jwt from "../helpers/jwt.js";
import crypto from "crypto";

export async function register(
  req: Request<unknown, unknown, RegisterPayload, unknown>,
  res: Response,
  next: NextFunction
) {
  try {
    const isValid = validatePayload<RegisterPayload>(req.body, registerSchema);
    if (!isValid) {
      console.log("Not a valid payload for register controller");
      next(createError(400, "Invalid provided information"));
      return;
    }

    const { username, email, password, gender, birthday } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.execQuery(
      `
      INSERT INTO users (
        id, email, username, password, gender, birthday
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [uuid(), email, username, hashedPassword, gender, birthday]
    );

    res.status(201).json({ msg: "user created" });
  } catch (error) {
    next(error);
    return;
  }
}

export async function login(
  req: Request<unknown, unknown, LoginPayload>,
  res: Response,
  next: NextFunction
) {
  try {
    const isValid = validatePayload<LoginPayload>(req.body, loginSchema);
    if (!isValid) {
      console.log("Not a valid payload for login controller");
      next(createError(400, "Invalid request body"));
      return;
    }
    const { email, password } = req.body;

    const emailResult = await db.execQuery<{ exists: boolean }>(
      `
      SELECT EXISTS(
        SELECT 1 FROM users WHERE email=$1
      );
      `,
      [email]
    );
    const emailExists = emailResult.rows[0].exists;
    if (!emailExists) {
      next(createError(404, "invalid email"));
      return;
    }

    const user = await db.execQuery<User>(
      `
      SELECT * FROM users WHERE email=$1;
      `,
      [email]
    );
    const { password: hashedPass, id, ...rest } = user.rows[0];
    const isValidPass = await bcryptjs.compare(password, hashedPass);
    if (!isValidPass) {
      next(createError(404, "invalid password"));
      return;
    }
    const token = jwt.create({ id }, "15m", false);
    const refreshToken = jwt.create({ id }, "1d", true);
    const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10);
    const csrfToken = crypto.randomBytes(32).toString("hex");

    await db.execQuery(
      `
      INSERT INTO x_csrf_tokens (
        id, user_id, xcsrf_token
      )
      VALUES ($1, $2, $3);
      `,
      [uuid(), id, csrfToken]
    );

    await db.execQuery(
      `
      INSERT INTO refresh_tokens (
        id, user_id, refresh_token
      )
      VALUES ($1, $2, $3);
      `,
      [uuid(), id, hashedRefreshToken]
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 8 * 24 * 60 * 60 * 1000,
      secure: false,
      path: "/",
    });
    res.cookie("xcsrf-token", csrfToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 8 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ id, ...rest });
  } catch (error) {
    next(error);
  }
}
