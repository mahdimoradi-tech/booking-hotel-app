# 🏨 Booking Hotel App | Advanced React SPA

A comprehensive, production-ready Single Page Application (SPA) built with React. This project demonstrates modern frontend architecture, robust state management, and a fully decoupled cloud-hosted backend to mimic real-world application environments.

## 🔗 Live Links

* **Frontend (Vercel):** [Live Application](https://booking-hotel-app-theta.vercel.app/)
* **REST API (Render):** [Live Backend](https://booking-hotel-app-api.onrender.com/hotels)

## 🏗️ Architecture & Cloud Deployment

Unlike standard mock projects, this application features a true decoupled architecture:
* **Frontend:** Hosted on **Vercel** for fast, global edge-network delivery and continuous integration.
* **Backend:** A dedicated RESTful API built with `json-server` and deployed on **Render.com**. This enables true **CRUD (Create, Read, Update, Delete)** operations. Any user visiting the live site can add, view, or remove bookmarks, and the data state will persist globally across all sessions.

## ✨ Core Features

* **Advanced State Management:** Utilizes React `Context` API combined with `useReducer` to handle complex global and local states seamlessly across the application.
* **Full CRUD Bookmarking System:** Users can add new favorite locations, view them on the map, and delete them. The data syncs instantly with the live Render database.
* **Smart Reverse Geocoding:** Automatically translates map coordinates (latitude/longitude) into valid City and Country names using the BigDataCloud API.
* **Interactive Mapping:** Integrates `Leaflet` and `react-leaflet` to display hotel positions dynamically, center the map based on user selection, and capture exact coordinates via map clicks.
* **Dynamic Search & URL State:** Implements URL-based state management using `SearchParams` to filter database results accurately and maintain easily shareable URLs.
* **Dynamic Routing:** Fetches and displays specific, detailed views for individual hotels[cite: 23] and bookmarks[cite: 22] based on unique URL parameters.
* **Authentication & Security:** Features a mock `AuthProvider` to simulate user sessions and utilizes a `ProtectedRoute` wrapper to guard sensitive views (like the bookmark dashboard) from unauthorized access[cite: 21].
* **Custom Hooks:** Clean separation of concerns using highly reusable custom hooks (`useFetch`, `useGeoLocation`, `useLatLngUrl`, `useOutSideClick`).

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite)
* **Routing:** React Router DOM
* **State Management:** Context API + useReducer
* **Map Integration:** Leaflet & React-Leaflet
* **Date & Calendar:** date-fns & react-date-range
* **HTTP Client:** Axios
* **Mock Backend:** JSON Server (Deployed on Render)
* **Icons & UI:** React Icons & React Country Flag[cite: 22]

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/mahdimoradi-tech/booking-hotel-app.git](https://github.com/mahdimoradi-tech/booking-hotel-app.git)