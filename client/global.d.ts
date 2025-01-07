export {};

declare global {
  type RegisterErrors = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}
