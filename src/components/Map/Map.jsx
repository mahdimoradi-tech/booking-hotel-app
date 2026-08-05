import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useLatLngUrl from "../../hooks/useLatLngUrl";

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([51, 3]);
  const [lat, lng] = useLatLngUrl();
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
    <div className="map-container">
      <MapContainer
        className="map-container__view"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="map-container__btn-location" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
