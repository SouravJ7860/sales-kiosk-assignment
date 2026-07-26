import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import socket from "../../socket/socket";

function Navbar() {
  const location = useLocation();

  const isRemoteNavigation = useRef(false);

  useEffect(() => {
    if (isRemoteNavigation.current) {
      isRemoteNavigation.current = false;
      return;
    }

    socket.emit("navigate", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    socket.on("remote-navigation", () => {
      isRemoteNavigation.current = true;
    });

    return () => {
      socket.off("remote-navigation");
    };
  }, []);

  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">🏢</span>

        <div>
          <h2>Sales Kiosk</h2>
          <p>Luxury Apartment Booking</p>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/gallery">Gallery</NavLink>

        <NavLink to="/videos">Videos</NavLink>

        <NavLink to="/inventory">Inventory</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;