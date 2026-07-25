import ReactCountryFlag from "react-country-flag";
import { useAsyncError, useNavigate } from "react-router-dom";
import useLatLngUrl from "../../hooks/useLatLngUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useBookmark } from "../context/BookmarkProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useLatLngUrl();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [isLoadingGeoCode, setIsLoadingGeoCode] = useState(false);
  const [geoCodeError, setGeoCodeError] = useState(null);
  const { createNewBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function getGeoCoding() {
      setIsLoadingGeoCode(true);
      setGeoCodeError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        );

        if (!data.countryCode || !data.countryName)
          throw new Error("wrong place selected! please select a city...");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        // toast.error(error.message);
        setGeoCodeError(error.message);
      } finally {
        setIsLoadingGeoCode(false);
      }
    }
    getGeoCoding();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    await createNewBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCode) return <p>Loading...</p>;
  if (geoCodeError) return <p>{geoCodeError}</p>; //todo: create a component for this section

  return (
    <div>
      <h2>Bookmark New location</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
          {/* <span className="flag">{countryCode}</span> //todo: create a function in js to show flag of country  */}
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary" onClick={(e) => handleSubmit(e)}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
