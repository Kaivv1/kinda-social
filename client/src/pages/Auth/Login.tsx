/*eslint-disable */

import { FormEvent, useRef, useState } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import "./auth_pages.scss";
import AuthNav from "../../components/AuthNav";
import { useLogin } from "../../hooks/useLogin";
import Loader from "../../components/Loader/Loader";
import { getErrorData } from "../../error";

export default function Login() {
  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { login, isLoading } = useLogin();
  function validate(data: FormData): boolean {
    const validateErrors = [];

    data.forEach((value, key) => {
      if (value === "") {
        setErrors((prev) => ({ ...prev!, [key]: "Field is required" }));
        validateErrors.push({ [key]: "Field is required" });
      }
    });

    return validateErrors.length === 0;
  }

  function reset(key: "email" | "password") {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(formRef.current);

    if (!validate(data)) return;
    const args: LoginArgs = {
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
    };
    login(args, {
      onError: (err) => {
        const apiErr = getErrorData(err);
        if (apiErr.msg) {
          const key =
            apiErr.msg.split(" ").find((val) => val === "password") ||
            apiErr.msg.split(" ").find((val) => val === "email");
          setErrors((prev) => ({
            ...prev,
            [key!]: `${apiErr.msg?.charAt(0).toUpperCase()}${apiErr.msg?.slice(
              1,
              apiErr.msg.length
            )}`,
          }));
        }
      },
    });
  }

  return (
    <div className="register-container">
      <Logo />
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="email"
          id="email"
          name="email"
          error={errors["email"]}
          onChange={(e) => {
            if (e.type) reset("email");
          }}
        />
        <Input
          label="password"
          name="password"
          id="password"
          error={errors["password"]}
          onChange={(e) => {
            if (e.type) reset("password");
          }}
        />
        <Button style={{ width: "100%" }}>
          {isLoading ? <Loader /> : "Login"}
        </Button>
        <AuthNav page="login" />
      </form>
    </div>
  );
}
