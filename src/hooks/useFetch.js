import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useFetch(url, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);

        setData(data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("fetch is canceled!");
        } else {
          setData([]);
          toast.error(err.message, {
            style: {
              fontWeight: "bold",
              fontSize: "1rem",
            },
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, query]);

  return {data, isLoading}
}
