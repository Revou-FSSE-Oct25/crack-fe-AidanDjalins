import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Explore from "./components/Explore";
import About from "./components/About";


export default function HomePage() {
  return (
    <div className="h-full overflow-x-hidden">
      <HeroBanner />
      <Explore />
      <About />
    </div>
  );
}
