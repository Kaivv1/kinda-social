/* eslint-disable */

import { FormEvent, useRef, useState } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import LabelError from "../../components/ui/Input/LabelError";
import "./auth_pages.scss";

export default function Register() {
  const [errors, setErrors] = useState<RegisterErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): boolean {
    let validateErrors = [];

    data.forEach((value, key) => {
      if (value === "") {
        setErrors((prev) => ({ ...prev!, [key]: "Field is required" }));
        validateErrors.push({ [key]: "Field is required" });
      }
    });
    if (
      data.get("confirmPassword")?.toString().length! !== 0 &&
      data.get("password") !== data.get("confirmPassword")
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Doesn't match password",
      }));
      validateErrors.push({ confirmPassword: "Doesn't match password" });
    }

    return validateErrors.length === 0;
  }

  function reset(key: "username" | "email" | "password" | "confirmPassword") {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(formRef.current);

    if (!validate(data)) return;
    console.log("it got through");
  }

  return (
    <div className="register-container">
      <Logo />
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          label="username"
          id="username"
          name="username"
          error={errors["username"]}
          onChange={(e) => {
            if (e.type) reset("username");
          }}
        />
        <Input
          label="email"
          id="email"
          name="email"
          type="email"
          error={errors["email"]}
          onChange={(e) => {
            if (e.type) reset("email");
          }}
        />
        <LabelError label="gender" radio>
          {["male", "female", "other"].map((radioInput) => (
            <div key={radioInput}>
              <Input
                defaultChecked={radioInput === "male"}
                type="radio"
                id={radioInput}
                name="gender"
                value={radioInput}
                variant="radio"
              />
              <label htmlFor={radioInput}>{radioInput}</label>
            </div>
          ))}
        </LabelError>
        <Input
          label="password"
          name="password"
          id="password"
          variant="password"
          error={errors["password"]}
          onChange={(e) => {
            if (e.type) reset("password");
          }}
        />
        <Input
          label="confirm password"
          name="confirmPassword"
          id="confirmPassword"
          variant="password"
          error={errors["confirmPassword"]}
          onChange={(e) => {
            if (e.type) reset("confirmPassword");
          }}
        />
        <Button style={{ width: "100%" }}>Register</Button>
      </form>
    </div>
  );
}
