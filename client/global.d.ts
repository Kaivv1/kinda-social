export {};

declare global {
  type RegisterErrors = {
    username: string;
    email: string;
    password: string;
    birthday: string;
    confirmPassword: string;
  };

  type LoginErrors = {
    email: string;
    password: string;
  };

  type RegisterArgs = {
    username: string;
    email: string;
    gender: string;
    birthday: string;
    password: string;
  };

  type LoginArgs = {
    email: string;
    password: string;
  };

  interface User {
    id: string;
    created_at: Date;
    updated_at: Date;
    username: string;
    email: string;
    gender: string;
    birthday: Date;
  }
}
