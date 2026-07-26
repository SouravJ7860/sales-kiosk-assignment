import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import galleryRoutes from "./routes/gallery.routes.js";
import videoRoutes from "./routes/video.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());


app.use("/api/gallery", galleryRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/book", bookingRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Sales Kiosk Backend Running 🚀"
    });
});

export default app;