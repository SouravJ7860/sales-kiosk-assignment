import Gallery from "../models/gallery.model.js";

export const getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};