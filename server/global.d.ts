import pg from "pg";

export {};

declare global {
  type Schema<T> = {
    [K in keyof T]: SchemaValue;
  };
  type SchemaValue =
    | "string"
    | "number"
    | "date"
    | "array"
    | "boolean"
    | CustomSchemaValue;

  type CustomSchemaValue = {
    type: "custom";
    validate: (value: any) => boolean;
  };

  type RegisterPayload = {
    username: string;
    email: string;
    gender: string;
    birthday: Date;
    password: string;
  };

  type RegisterReturnVals = {
    id: string;
    created_at: Date;
    updated_at: Date;
    email: string;
    username: string;
    password: string;
  };

  type LoginPayload = {
    email: string;
    password: string;
  };

  interface UserWithoutPass {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    gender: string;
    birthday: Date;
  }

  interface User extends UserWithoutPass {
    password: string;
  }

  interface CustomError extends Error {
    msg: string;
    code: number;
  }
}
