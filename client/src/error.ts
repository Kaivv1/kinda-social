import { AxiosError } from "axios";

export function getErrorData(err: unknown) {
  const error = err as AxiosError<{ msg: string }>;
  return { code: error.response?.status, msg: error.response?.data?.msg };
}
