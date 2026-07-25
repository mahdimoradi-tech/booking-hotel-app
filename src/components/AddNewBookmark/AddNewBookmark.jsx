import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";

function AddNewBookmark() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bookmark New location</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input type="text" name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" />
          <ReactCountryFlag className="flag" svg />
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
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
