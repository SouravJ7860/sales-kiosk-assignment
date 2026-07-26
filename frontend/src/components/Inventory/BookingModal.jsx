import { useState } from "react";
import { toast } from "react-toastify";

function BookingModal({ unit, onClose, onSubmit }) {

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!customerName || !phoneNumber) {

            // alert("Please fill all fields");
            toast.warning("Please fill all fields");

            return;

        }

        try {

            setLoading(true);

            await onSubmit({
                inventoryId: unit._id,
                customerName,
                phoneNumber,
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="booking-modal">

                <h2>Book {unit.unitNumber}</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                    />

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Booking..." : "Book"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default BookingModal;