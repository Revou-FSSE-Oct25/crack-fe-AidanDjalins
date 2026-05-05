"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Use leaflet default marker icon design
const icon = L.icon({
  iconUrl: "./icons/marker-icon.png",
  iconRetinaUrl: "./icons/marker-icon-2x.png",
  shadowUrl: "./icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const locations = [
  { name: "Chinoss Coffeespace Sukajadi", position: [0.514183198316319, 101.43609466724826] as [number, number] },
  { name: "Chinoss Second Home", position: [0.514183198316319, 101.43609466724826] as [number, number] },
  { name: "Chinoss Panam", position: [0.47524296959808543, 101.37503313841236] as [number, number] },
  { name: "Chinoss Jl Sudirman", position: [0.5357884803313919, 101.4473692870436] as [number, number] },
  { name: "Chinoss Duri", position: [1.2624089709124604, 101.187629211426] as [number, number] },
];

export default function Map() {
  return (
    <div className="relative z-0">
        <MapContainer
          center={[0.98995682281982, 101.64414273703167]}
          zoom={9}
          className="w-full h-[500px]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <Marker key={loc.name} position={loc.position} icon={icon}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
    </div>
  );
}