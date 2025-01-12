import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
const tokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

export function create(
  payload: string | Buffer | object,
  duration: string | number,
  refresh: boolean
): string {
  const secret = refresh ? refreshTokenSecret! : tokenSecret!;
  const token = jsonwebtoken.sign(payload, secret, {
    expiresIn: duration,
  });

  return token;
}
