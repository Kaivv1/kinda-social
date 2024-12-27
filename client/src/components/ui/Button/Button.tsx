import { LucideIcon } from "lucide-react";
import "./button.scss";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonProps = {
  variant?: "default" | "withIcon" | "green" | "red" | "outlined" | "icon";
  children?: ReactNode;
  icon?: LucideIcon;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  variant = "default",
  icon: Icon,
  ...props
}: ButtonProps) {
  if (variant === "icon" && Icon)
    return (
      <button data-variant={variant} className="button" {...props}>
        <Icon className="btnIcon" />
      </button>
    );

  if (variant === "withIcon" && Icon)
    return (
      <button data-variant={variant} className="button" {...props}>
        <span>{props.children}</span>
        <Icon className="btnIcon" />
      </button>
    );

  return (
    <button data-variant={variant} className="button" {...props}>
      <span>{props.children}</span>
    </button>
  );
}
