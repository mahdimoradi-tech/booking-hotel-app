import { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiOutlineLocationMarker,
  HiOutlineSearch,
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
import { HiChevronRight, HiOutlineBookmark } from "react-icons/hi2";

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
    <>
      <header className="hero-header">
        <div className="hero-header__content">
          <div className="hero-header__welcome">
            <p className="hero-header__wish">Good morning.</p>
            <h3 className="hero-header__title">Where to, Mahdi?✈️</h3>
          </div>
          <button className="hero-header__action btn-glass">
            <HiOutlineBookmark className="icon" />
          </button>
        </div>

        <div className="hero-header__search glass-box">
          <div>
            <HiOutlineSearch className="icon icon--search" />
          </div>

          <input
            value={destination}
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Search destinations..."
            className="hero-header__input"
            name="destination"
            id="destination"
          />

          <button className="hero-header__submit-btn" onClick={handleSearch}>
            Hotels
          </button>
        </div>
      </header>

      <section className="search-card">
        <div className="search-card__destination">
          <p className="search-card__title">DESTINATION</p>
          <button type="button" className="search-card__destination-select">
            <HiOutlineLocationMarker className="icon icon--destination"/>
            <p className="search-card__destination-name">Paris, France</p>
            <HiChevronRight className="icon icon--chevron"/>
          </button>
        </div>
      </section>

      <div className="header">
        <NavLink to="/bookmark">Bookmarks</NavLink>
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
            <div
              className="dateDropDown"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
            </div>
            {openDate && (
              <DateRange
                className="date"
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <div
              id="optionDropDown"
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

            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchBtn" onClick={handleSearch}>
              <HiSearch className="headerIcon" />
            </button>
          </div>
        </div>
        <User />
      </div>
    </>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef(null);
  useOutSideClick(optionRef, () => setOpenOptions(false));

  return (
    <div className="guestOptions" ref={optionRef}>
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
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
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
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button>
            <HiLogout className="icon" onClick={handleLogout} />
          </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
