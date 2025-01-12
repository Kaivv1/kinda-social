import { Link } from "react-router-dom";

type AuthNavProps = {
  page: "login" | "register";
};

export default function AuthNav({ page }: AuthNavProps) {
  return (
    <div className="auth-nav">
      <span>
        {page === "register"
          ? "Already have an account?"
          : "Don't have an account?"}
      </span>
      <Link to={`/${page === "login" ? "register" : "login"}`}>{`${(page ===
      "login"
        ? "register"
        : "login"
      )
        .charAt(0)
        .toUpperCase()}${(page === "login" ? "register" : "login").slice(
        1,
        (page === "login" ? "register" : "login").length
      )}`}</Link>
    </div>
  );
}
