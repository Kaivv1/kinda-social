import { SendIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import "./landing_page.scss";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <h1>Greetings fellas this is the landing page of Kinda Social</h1>
      <p>
        This is an application where you can find other people to connect with.
        Share your daily adventures and chat with your friends.
      </p>
      <Button variant="withIcon" icon={SendIcon}>
        Sign In
      </Button>
    </div>
  );
}
