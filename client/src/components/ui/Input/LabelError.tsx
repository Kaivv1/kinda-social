import { ReactNode } from "react";

type LabelErrorProps = {
  error?: string;
  htmlFor?: string | undefined;
  children: ReactNode;
  label: string | undefined;
  radio?: boolean;
};

export default function LabelError({
  children,
  label,
  htmlFor,
  error,
  radio,
}: LabelErrorProps) {
  return (
    <div className="input-wrapper">
      <div className="input-label-error">
        <label htmlFor={htmlFor}>{label}</label>
        {error ? <span className="input-err">{error}</span> : ""}
      </div>

      {radio ? <div className="radio-wrapper">{children}</div> : children}
    </div>
  );
}
