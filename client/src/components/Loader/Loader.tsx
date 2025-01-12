import { LoaderIcon } from "lucide-react";
import "./loader.scss";
export default function Loader() {
  return (
    <div className="loader-container">
      <LoaderIcon className="loader" />
    </div>
  );
}
