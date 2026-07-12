# 🏨 Hotel Booking App (Advanced SPA)

A comprehensive, production-ready React application for booking hotels. This project focuses on advanced state management, interactive maps, and modern frontend architecture.

## 🔗 Live Demo

[View Live Application](https://booking-hotel-app-theta.vercel.app/)

## ✨ Core Features

* **Advanced State Management:** Utilizes React `Context` API and `useReducer` for handling complex global and local states seamlessly.
* **Interactive Maps:** Integrates `Leaflet` and `react-leaflet` to locate and display hotel positions dynamically.
* **Dynamic Search & Filtering:** Implements URL-based state management using `SearchParams` to filter database results accurately and maintain shareable URLs.
* **Asynchronous Context:** Handles API calls and async actions securely within the Context architecture.
* **Authentication Flow:** Features a mock `AuthProvider` to simulate user login/logout states.
* **Protected Routes:** Ensures sensitive views (like user profiles or checkout pages) are guarded behind authentication walls.
* **Mock Backend:** Powered by `json-server` to simulate a real-world RESTful API for fetching hotel and booking data.

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 (Vite)
* **Styling:** Custom CSS (Modular structure)
* **Routing:** React Router DOM 7
* **State Management:** Context API + useReducer
* **Map Integration:** Leaflet & React-Leaflet
* **Date Handling:** date-fns & react-date-range
* **HTTP Client:** Axios
* **Mock Database:** JSON Server

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/mahdimoradi-tech/booking-hotel-app.git](https://github.com/mahdimoradi-tech/booking-hotel-app.git)