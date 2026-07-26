import mongoose from "mongoose";

import Booking from "../models/booking.model.js";
import Inventory from "../models/inventory.model.js";
import { getIO, ROOM_NAME } from "../socket/socket.js";

export const bookUnit = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { inventoryId, customerName, phoneNumber } = req.body;

    if (!inventoryId || !customerName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    session.startTransaction();

    // Find inventory
    const inventory = await Inventory.findById(inventoryId).session(session);

    if (!inventory) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    // Already booked?
    if (inventory.status === "BOOKED") {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "This unit has already been booked.",
      });
    }

    // Update inventory
    inventory.status = "BOOKED";
    await inventory.save({ session });

    // Create booking
    const booking = await Booking.create(
      [
        {
          inventory: inventory._id,
          customerName,
          phoneNumber,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    // Notify all connected clients AFTER commit
    getIO().to(ROOM_NAME).emit("unitBooked", {
      inventoryId: inventory._id,
      status: inventory.status,
    });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking: booking[0],
      inventory,
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};