import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";

export default function Hotels() {
  const { hotels, isLoading } = useHotels();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div className="searchItem">
            <img src={item.medium_url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">€&nbsp;{item.price}&nbsp;</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
