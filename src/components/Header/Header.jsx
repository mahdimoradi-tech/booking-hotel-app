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
import {
  HiChevronRight,
  HiOutlineBookmark,
  HiOutlineCalendar,
} from "react-icons/hi2";

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

  const dateRef = useRef(null);

  useOutSideClick(dateRef, () => setOpenDate(false));

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
          <NavLink to="/bookmark" className="hero-header__action glass-box">
            <HiOutlineBookmark className="icon" />
          </NavLink>
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
            <HiOutlineLocationMarker className="icon icon--destination" />
            <span className="search-card__destination-name">
              {destination ? destination : "Where to go?"}
            </span>
            <HiChevronRight className="icon icon--chevron" />
          </button>
        </div>

        <div className="search-card__date" ref={dateRef}>
          <p className="search-card__title">DATES</p>

          <div
            className="search-card__date-selection"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="search-card__date-select"
              onClick={() => setOpenDate(!openDate)}
            >
              <HiOutlineCalendar className="icon icon--calendar" />
              <div className="search-card__date-desc">
                <span className="search-card__date-selected">
                  <span className="search-card__date-category">Check-in</span>
                  {format(date[0].startDate, "MMM dd")}
                </span>
                <span className="search-card__date-separator"> - </span>
                <span className="search-card__date-selected">
                  <span className="search-card__date-category">Check-out</span>
                  {format(date[0].endDate, "MMM dd")}
                </span>
              </div>
            </button>
            {openDate && (
              <div className="search-card__calendar-wrapper">
                <DateRange
                  ranges={date}
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={true}
                  months={1}
                  direction="horizontal"
                  className="custom-date-range"
                />
              </div>
            )}
          </div>
        </div>

        <div className="search-card__destination-options">
          <p className="search-card__title">GUESTS & ROOMS</p>
          <GuestOptionList options={options} handleOptions={handleOptions}/>
        </div>

        <button className="search-card__btn" onClick={handleSearch}>
          Search Hotels
        </button>
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
  // const optionRef = useRef(null);
  // useOutSideClick(optionRef, () => setOpenOptions(false));

  const guestCategories = [
    { id: "adult", label: "Adults", minLimit: 1 },
    { id: "children", label: "Children", minLimit: 0 },
    { id: "room", label: "Rooms", minLimit: 1 },
  ];

  return (
    <div className="search-card__options">
      {guestCategories.map((item) => (
        <OptionItem
          key={item.id}
          type={item.id}
          label={item.label}
          options={options}
          minLimit={item.minLimit}
          handleOptions={handleOptions}
        />
      ))}
    </div>
  );
}

function OptionItem({ type, label, options, minLimit, handleOptions }) {
  return (
    <div className="search-card__option">
      <p className="search-card__option-title">{label}</p>
      <div className="search-card__option-count">
        <button
          type="button"
          className="search-card__option-btn search-card__option-btn--minus"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus />
        </button>
        <span className="search-card__option-number">{options[type]}</span>
        <button
          type="button"
          className="search-card__option-btn search-card__option-btn--plus"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus />
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
