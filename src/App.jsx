import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
// import ParkingForm from "./pages/ParkingForm";
import ParkingService from "./Pages/ParkingService"; // Import new pages
import Vehicle from "./pages/Vehicle";
import Payments from "./Pages/Payments";
// import AccountInformation from "./pages/AccountInformation";
import About from "./pages/About";
import Notification from "./pages/Notification";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Existing Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="notification" element={<Notification />} />
          {/* New Routes */}
          <Route path="parking-service" element={<ParkingService />} />
          <Route path="vehicles" element={<Vehicle />} />
          <Route path="payments" element={<Payments />} />
          {/* <Route path="account-information" element={<AccountInformation />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
