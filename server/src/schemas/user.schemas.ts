export const registerSchema: Schema<RegisterPayload> = {
  username: "string",
  email: "string",
  password: "string",
  gender: "string",
  birthday: "date",
};

export const loginSchema: Schema<LoginPayload> = {
  email: "string",
  password: "string",
};
