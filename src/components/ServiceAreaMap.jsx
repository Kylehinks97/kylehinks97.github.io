import { useMemo } from "react";
import { CircleMarker, MapContainer, Polygon, TileLayer } from "react-leaflet";
import * as turf from "@turf/turf";
import { serviceAreaCoordinates } from "../siteData";
import "leaflet/dist/leaflet.css";

export default function ServiceAreaMap() {
  const polygonCoords = useMemo(() => {
    const bufferedPolygon = turf.buffer(
      turf.multiPoint(serviceAreaCoordinates),
      3.4,
      {
        units: "kilometers",
      }
    );

    return bufferedPolygon.geometry.coordinates[0];
  }, []);

  return (
    <div className="map-card">
      <div className="section-copy">
        <span className="section-eyebrow">Local coverage</span>
        <h2>Where we deliver care</h2>
        <p>
          We provide care across the surrounding area with tailored support
          plans built around the individual, their home environment, and the
          level of assistance they need.
        </p>
      </div>
      <MapContainer
        className="service-map"
        center={[52.605738, -1.957181]}
        zoom={10}
        scrollWheelZoom={false}
      >
        <Polygon positions={polygonCoords} pathOptions={{ color: "#2d6a4f" }} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceAreaCoordinates.map((coord, index) => (
          <CircleMarker
            key={`${coord[0]}-${coord[1]}-${index}`}
            center={coord}
            radius={4}
            pathOptions={{
              fillColor: "#ff6b3d",
              color: "#ffffff",
              weight: 1,
              fillOpacity: 0.85,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
