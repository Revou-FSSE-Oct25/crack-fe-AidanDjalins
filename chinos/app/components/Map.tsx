"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const icon = L.icon({
  iconUrl: "/icons/marker-icon.png",
  iconRetinaUrl: "/icons/marker-icon-2x.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
};

export default function Map() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch(`${BASE_URL}/locations`);
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error("Map fetch error:", err);
      }
    }

    fetchLocations();
  }, []);

  return (
    <div className="relative z-0">
      <MapContainer
        center={[0.98995682281982, 101.64414273703167]}
        zoom={9}
        className="w-full h-[350px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={icon}
          >
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}