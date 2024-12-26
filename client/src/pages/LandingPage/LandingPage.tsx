import Input from "../../components/ui/Input/Input";
import "./landing_page.scss";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <h1>Greetings fellas this is the landing page of Kinda Social</h1>
      <p>
        This is an application where you can find other people to connect with.
        Share your daily adventures and chat with your friends.
      </p>
      <form action="">
        <Input
          label="Username"
          id="username"
          placeholder="Enter username"
          error="this is an error"
          type="file"
        />
      </form>
    </div>
  );
}
