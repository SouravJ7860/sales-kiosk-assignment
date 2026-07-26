import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";

import { getInventory } from "../services/inventory.service";
import { bookUnit } from "../services/booking.service";

import TowerCard from "../components/Inventory/TowerCard";
import BookingModal from "../components/Inventory/BookingModal";
import Spinner from "../components/Common/Spinner";
import ErrorState from "../components/Common/ErrorState";

import InventorySummary from "../components/Inventory/InventorySummary";

import { toast } from "react-toastify";
import socket from "../socket/socket";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Show loader only on initial page load
    loadInventory(true);

    socket.on("unitBooked", () => {
      loadInventory(false);
    });

    socket.on("booking:open", (unit) => {
      setSelectedUnit(unit);
    });

    socket.on("booking:close", () => {
      setSelectedUnit(null);
    });

    return () => {
      socket.off("unitBooked");
      socket.off("booking:open");
      socket.off("booking:close");
    };
  }, []);

  async function loadInventory(showLoader = false) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const data = await getInventory();

      setInventory(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load inventory. Please try again.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  const groupedInventory = useMemo(() => {
    return inventory.reduce((acc, unit) => {
      if (!acc[unit.tower]) {
        acc[unit.tower] = [];
      }

      acc[unit.tower].push(unit);

      return acc;
    }, {});
  }, [inventory]);

  function handleUnitClick(unit) {
    if (unit.status === "BOOKED") return;

    setSelectedUnit(unit);

    socket.emit("booking:open", unit);
  }

  async function handleBooking(formData) {
    try {
      const response = await bookUnit(formData);

      toast.success(response.message);

      setSelectedUnit(null);

      // Refresh inventory without showing the spinner
      await loadInventory(false);
    } catch (err) {
      toast.error(err.message || "Booking Failed");
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Spinner />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorState
          message={error}
          onRetry={() => loadInventory(true)}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <h1>Inventory</h1>

      <InventorySummary inventory={inventory} />

      



      <div className="tower-grid">
        {Object.entries(groupedInventory).map(([tower, units]) => (
          <TowerCard
            key={tower}
            tower={tower}
            units={units}
            onUnitClick={handleUnitClick}
          />
        ))}
      </div>


      {selectedUnit && (

        <BookingModal
          unit={selectedUnit}
          onClose={() => {
            setSelectedUnit(null);
            socket.emit("booking:close");
          }}
          onSubmit={handleBooking}
        />

      )}

    </MainLayout>
  );
}

export default InventoryPage;