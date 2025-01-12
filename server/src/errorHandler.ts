import { ErrorRequestHandler } from "express";
import pg from "pg";

export function createError(code: number, msg: string) {
  let error = new Error() as CustomError;
  error.msg = msg;
  error.code = code;
  return error;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof pg.DatabaseError) {
    console.log("asd");
    console.log(err.constraint);
    switch (err.code) {
      case "23505":
        let key;
        key = err.constraint?.split("_")[1];
        if (err.constraint === "x_csrf_tokens_user_id_key") {
          key = "user with that csrf token session";
        }
        if (err.constraint === "refresh_tokens_user_id_key") {
          key = "user with that refresh token";
        }
        res.status(409).json({ msg: `${key} already exists` });
        return;
      default:
        console.log("Unknown DB Error");
        console.log(err);
        res.status(500).json({ msg: "DB error" });
        return;
    }
  } else if (err instanceof Error) {
    const { msg, code } = err as CustomError;
    res.status(code).json({ msg });
    return;
  } else {
    console.log("Unknown Error");
    console.log(err);
    console.log("Returning server error...");
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
};
