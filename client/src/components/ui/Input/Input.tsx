import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./input.scss";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import LabelError from "./LabelError";

type InputProps = {
  label?: string | undefined;
  variant?: "default" | "password" | "radio";
  error?: string;
} & ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  variant = "default",
  error,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [htmlFor, setHtmlFor] = useState<string | undefined>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const toggleIsChecking = () => setIsChecking((prev) => !prev);

  useEffect(() => {
    setHtmlFor(inputRef.current?.id);
  }, [inputRef.current?.id, setHtmlFor]);

  switch (variant) {
    case "password":
      return (
        <LabelError htmlFor={htmlFor} label={label} error={error}>
          <div className="pass-input">
            <input
              type={isChecking ? "text" : "password"}
              ref={inputRef}
              data-type={variant}
              className={`${error && "invalid-input"}`}
              {...props}
            />
            <span onClick={toggleIsChecking}>
              {isChecking ? (
                <EyeIcon className="input-icon" />
              ) : (
                <EyeOffIcon className="input-icon" />
              )}
            </span>
          </div>
        </LabelError>
      );
    case "radio":
      return <input ref={inputRef} data-type={variant} {...props} />;
    case "default":
      return (
        <LabelError htmlFor={htmlFor} label={label} error={error}>
          <input
            ref={inputRef}
            data-type={variant}
            className={`${error && "invalid-input"}`}
            {...props}
          />
        </LabelError>
      );
  }
}
