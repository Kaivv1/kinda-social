import { FormEvent } from "react";
import { Dialog } from "../../components/ui/Dialog/DialogContext";
import Input from "../../components/ui/Input/Input";
import "./landing_page.scss";

export default function LandingPage() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="landing-page-container">
      <h1>Greetings fellas this is the landing page of Kinda Social</h1>
      <p>
        This is an application where you can find other people to connect with.
        Share your daily adventures and chat with your friends.
      </p>
      <Dialog>
        <Dialog.Trigger>Trigger</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header
            title="Login"
            description="Welcome to kinda social. Please login before you continue!"
          />
          <form onSubmit={handleSubmit}>
            <Input label="username" />
            <Input label="email" />
            <Input label="password" />
            <Dialog.Footer>
              <Dialog.Button>Login</Dialog.Button>
              <Dialog.Close />
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
