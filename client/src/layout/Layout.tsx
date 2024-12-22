import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
