import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./input.scss";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

type InputProps = {
  label: string;
  variant?: "default" | "password";
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

  return (
    <div className="input-wrapper">
      <div className="input-label-error">
        <label htmlFor={htmlFor}>{label}</label>
        {error ? <span className="input-err">{error}</span> : ""}
      </div>
      {variant === "password" ? (
        <div className="pass-input">
          <input
            type={isChecking ? "text" : "password"}
            ref={inputRef}
            data-type={variant}
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
      ) : (
        <input ref={inputRef} data-type={variant} {...props} />
      )}
    </div>
  );
}
