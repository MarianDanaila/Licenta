import "./Weather.css";
import Search from "./Search";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="weather">
      <Search defaultCity="Bucharest" />
      <Footer />
    </div>
  );
}
