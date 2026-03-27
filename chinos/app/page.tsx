import Image from "next/image";
import HeroBanner from "./components/HeroBanner";
import Explore from "./components/Explore";


export default function HomePage() {
  return (
    <div className="h-full overflow-x-hidden">
      <HeroBanner />
      <Explore />
    </div>
  );
}
