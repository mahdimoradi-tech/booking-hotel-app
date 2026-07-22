import { useEffect, useState } from "react";
import { useHotels } from "../context/HotelsProvider";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
function Map() {
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState([51, 3]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: getCurrentPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (getCurrentPosition?.lat && getCurrentPosition?.lng)
      setMapCenter([getCurrentPosition?.lat, getCurrentPosition?.lng]);
  }, [getCurrentPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <button className="getLocation" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your location"}
        </button>
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
