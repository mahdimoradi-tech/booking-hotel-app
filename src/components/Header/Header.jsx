import { useRef, useState } from "react";
import {
  HiMinus,
  HiOutlineLocationMarker,
  HiOutlineSearch,
  HiPlus,
} from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  HiChevronRight,
  HiOutlineBookmark,
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi2";
import { useHotels } from "../context/HotelsProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || "",
  );
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
  const dateRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHotelsPage = location.pathname.includes("/hotels");
  const { hotelsNumber } = useHotels();

  useOutSideClick(dateRef, () => setOpenDate(false));

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
      <header
        className={`hero-header ${isHotelsPage ? "hero-header--hidden-card-mobile" : ""}`}
      >
        <div className="hero-header__content">
          <div className="hero-header__welcome">
            <p className="hero-header__wish">
              {isHotelsPage
                ? `${options.adult} adults & ${options.children} children & ${options.room} room`
                : isAuthenticated
                  ? "Welcome back."
                  : "Plan your trip."}
            </p>
            <h3 className="hero-header__title">
              {isHotelsPage ? (
                <span className="hero-header__hotels-header">
                  Hotels{" "}
                  <span className="hero-header__hotels-number">
                    {hotelsNumber}
                  </span>
                </span>
              ) : isAuthenticated ? (
                "Where to next? ✈️"
              ) : (
                "Ready to explore? 🌍"
              )}
            </h3>
          </div>

          <User />
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

      <section
        className={`search-card ${isHotelsPage ? "search-card--hidden-mobile" : ""}`}
      >
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
          <GuestOptionList options={options} handleOptions={handleOptions} />
        </div>

        <button className="search-card__btn" onClick={handleSearch}>
          Search Hotels
        </button>
      </section>
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
    <div className="hero-header__actions">
      {isAuthenticated && (
        <NavLink to="/bookmark" className="hero-header__action glass-box">
          <HiOutlineBookmark className="icon" />
        </NavLink>
      )}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="hero-header__action glass-box"
          title="Logout"
        >
          <IoLogOutOutline className="icon" />
        </button>
      ) : (
        <NavLink
          to="/login"
          className="hero-header__action glass-box"
          title="Login"
        >
          <HiOutlineUser className="icon" />
        </NavLink>
      )}
    </div>
  );
}
