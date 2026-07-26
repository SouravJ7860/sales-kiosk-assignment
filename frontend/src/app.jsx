import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef } from "react";

import GalleryPage from "./pages/GalleryPage";
import VideosPage from "./pages/VideosPage";
import InventoryPage from "./pages/InventoryPage";

import socket from "./socket/socket";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const skipNextEmit = useRef(false);

  // Emit local route changes
  useEffect(() => {
    if (skipNextEmit.current) {
      skipNextEmit.current = false;
      return;
    }

    console.log("EMIT:", location.pathname);

    socket.emit("route:change", location.pathname);
  }, [location.pathname]);

  // Listen once
  useEffect(() => {
    const handleRouteChange = (path) => {
      console.log("RECEIVED:", path);

      if (path === location.pathname) return;

      skipNextEmit.current = true;

      navigate(path);
    };

    socket.on("route:change", handleRouteChange);

    return () => {
      socket.off("route:change", handleRouteChange);
    };
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/gallery" />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
}

export default App;