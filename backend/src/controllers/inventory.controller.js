import Inventory from "../models/inventory.model.js";

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      tower: 1,
      unitNumber: 1,
    });

    res.status(200).json({
      success: true,
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};