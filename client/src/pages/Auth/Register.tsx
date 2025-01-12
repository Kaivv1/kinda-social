/* eslint-disable */

import { FormEvent, useRef, useState } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import LabelError from "../../components/ui/Input/LabelError";
import "./auth_pages.scss";
import { useRegister } from "../../hooks/useRegister";
import { getErrorData } from "../../error";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import AuthNav from "../../components/AuthNav";

export default function Register() {
  const [errors, setErrors] = useState<RegisterErrors>({
    username: "",
    email: "",
    password: "",
    birthday: "",
    confirmPassword: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { register, isLoading } = useRegister();
  const navigate = useNavigate();

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

  function reset(
    key: "username" | "email" | "password" | "birthday" | "confirmPassword"
  ) {
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(formRef.current);

    if (!validate(data)) return;
    const args: RegisterArgs = {
      username: data.get("username")?.toString()!,
      email: data.get("email")?.toString()!,
      password: data.get("password")?.toString()!,
      gender: data.get("gender")?.toString()!,
      birthday: new Date(data.get("birthday")?.toString()!).toISOString(),
    };
    register(args, {
      onSuccess: () => navigate("/login"),
      onError: (err) => {
        const apiErr = getErrorData(err);
        if (apiErr.msg) {
          const key =
            apiErr.msg.split(" ").find((val) => val === "username") ||
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
          label="birthday"
          name="birthday"
          id="birthday"
          type="date"
          error={errors["birthday"]}
          onClick={(e) => e.currentTarget.showPicker()}
          onChange={(e) => {
            if (e.type) reset("birthday");
          }}
        />
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
        <Button style={{ width: "100%" }}>
          {isLoading ? <Loader /> : "Register"}
        </Button>
        <AuthNav page="register" />
      </form>
    </div>
  );
}
