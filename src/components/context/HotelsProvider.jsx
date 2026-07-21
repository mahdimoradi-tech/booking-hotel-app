import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelsContext = createContext(null);

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`,
  );

  return (
    <HotelsContext value={{ hotels, isLoading }}>{children}</HotelsContext>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
