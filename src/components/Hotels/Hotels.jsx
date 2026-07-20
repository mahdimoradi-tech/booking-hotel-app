import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "",
  );
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`,
  );

  if (isLoading) return <p>Loading...</p>;

  return <div>{data.length}</div>;
}
