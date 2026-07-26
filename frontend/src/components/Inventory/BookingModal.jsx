import { useState } from "react";
import { toast } from "react-toastify";

function BookingModal({ unit, onClose, onSubmit }) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    // Allow only digits and maximum 10
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !phoneNumber.trim()) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        inventoryId: unit._id,
        customerName: customerName.trim(),
        phoneNumber,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>🏠 Book Apartment</h2>

        <div className="unit-badge">
          {unit.unitNumber}
        </div>

        <form onSubmit={handleSubmit}>

          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label>Phone Number</label>

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />

          <small className="phone-hint">
            Enter a valid 10-digit mobile number
          </small>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="book-btn"
              disabled={loading}
            >
              {loading ? "Booking..." : "🚀 Book Now"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookingModal;