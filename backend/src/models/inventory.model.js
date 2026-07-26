import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    tower: {
      type: String,
      required: true,
    },

    unitNumber: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);