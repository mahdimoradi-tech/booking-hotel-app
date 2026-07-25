import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkProvider";
import { useEffect } from "react";

function SingleBookmark() {
    const {getCurrentBookmark, currentBookmark, isLoading} = useBookmark()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentBookmark(id)
    }, [id])

    if(isLoading || !currentBookmark) return <p>Loading...</p> 

 return (
    <>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        {" "}
        &larr; Back
      </button>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </>
  );
}

export default SingleBookmark