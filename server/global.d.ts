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
    password: string;
  };
}
