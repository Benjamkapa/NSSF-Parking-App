import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ParkingService from "./Pages/ParkingService"; // Import new pages
import Vehicle from "./pages/Vehicle";
import Payments from "./Pages/Payments";
import About from "./pages/About";
// import Notification from "./pages/Notification";
import Layout from "./components/Layout";
import Smoke from "./Pages/smokebg"; // Import smoke page
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="notification" element={<Notification />} /> */}
          <Route path="parking-service" element={<ParkingService />} />
          <Route path="vehicles" element={<Vehicle />} />
          <Route path="payments" element={<Payments />} />
          <Route path="smoke" element={<Smoke />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;