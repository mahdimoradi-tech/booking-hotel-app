import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiOutlineUser,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "",
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 1,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="header__search">
        <div className="header__search-item">
          <MdLocationOn className="header__icon location__icon" />
          <input
            value={destination}
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            placeholder="where to go...?"
            className="header__search-input"
            name="destination"
            id="destination"
          />
        </div>
        <div className="header__search-item">
          <HiCalendar className="header__icon date-icon" />
          <div
            className="header__date-drop-down"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
          </div>
          {openDate && (
            <DateRange
              className="header__date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <div className="header__search-item">
          <div
            id="header__option-drop-down"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              options={options}
              handleOptions={handleOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>

        <button className="header__search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef(null);
  useOutSideClick(optionRef, () => setOpenOptions(false));

  return (
    <div className="header__guest-options" ref={optionRef}>
      <OptionItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="header__guest-option-item">
      <span className="header__guest-option-text">{type}</span>
      <div className="header__guest-option-counter">
        <button
          className="header__guest-option-counter-btn"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="header__guest-option-counter-name">
          {options[type]}
        </span>
        <button
          className="header__guest-option-counter-btn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header__actions">
      {isAuthenticated && (
        <NavLink to="/bookmark" className="header__action glass-box">
          <HiOutlineBookmark className="icon" />
        </NavLink>
      )}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="header__action glass-box"
          title="Logout"
        >
          <IoLogOutOutline className="icon" />
        </button>
      ) : (
        <NavLink to="/login" className="header__action glass-box" title="Login">
          <HiOutlineUser className="icon" />
        </NavLink>
      )}
    </div>
  );
}
