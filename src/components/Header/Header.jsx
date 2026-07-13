import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch } from "react-icons/hi";

function Header() {
  const [destination, setDestination] = useState("");
  
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            placeholder="where to go...?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2026/07/13</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div>2 adult &bull; 1 children &bull; 1 room</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
