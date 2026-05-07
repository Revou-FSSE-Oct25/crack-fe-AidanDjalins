"use client"

import { useEffect } from "react";

import HeroBanner from "./components/HeroBanner";
import Explore from "./components/Explore";
import About from "./components/About";
import Locations from "./components/Locations";


export default function HomePage() {

  useEffect(() => {
      const loadLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    }

    loadLocomotiveScroll();
  }, []);
  return (
    <div className="h-full overflow-x-hidden">
      <HeroBanner />
      <Explore />
      <About />
      <Locations />
    </div>
  );
}
