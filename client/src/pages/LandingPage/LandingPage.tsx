import { FormEvent, useRef, useState } from "react";
import { Dialog } from "../../components/ui/Dialog/DialogContext";
import Input from "../../components/ui/Input/Input";
import "./landing_page.scss";
import Button from "../../components/ui/Button/Button";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const toggle = () => setIsOpen((prev) => !prev);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ref.current) return;
  }

  return (
    <div className="landing-page-container">
      <h1>Greetings fellas this is the landing page of Kinda Social</h1>
      <p>
        This is an application where you can find other people to connect with.
        Share your daily adventures and chat with your friends.
      </p>
      <Dialog>
        <Dialog.Trigger open={isOpen} onClick={toggle}>
          Trigger
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header
            title="Login"
            description="Welcome to kinda social. Please login before you continue!"
          />
          <form onSubmit={handleSubmit}>
            <Input label="username" name="username" />
            <Input label="email" name="email" />
            <Input label="password" name="" />
            <Dialog.Footer>
              <Dialog.Button>Login</Dialog.Button>
              <Dialog.Close onClick={toggle} />
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog>
      <form onSubmit={handleSubmit} ref={ref}>
        <Input label="username" id="username" name="username" />
        <Input label="email" id="email" name="email" />

        <Input
          label="password"
          id="password"
          variant="password"
          name="password"
        />
        <Button type="submit">sumbit</Button>
      </form>
    </div>
  );
}
