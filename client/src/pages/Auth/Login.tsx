import Logo from "../../components/Logo/Logo";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import "./auth_pages.scss";

export default function Login() {
  return (
    <div className="register-container">
      <Logo />
      <form>
        <Input label="email" id="email" name="email" />
        <Input label="password" name="password" id="password" />
        <Button style={{ width: "100%" }}>Login</Button>
      </form>
    </div>
  );
}
