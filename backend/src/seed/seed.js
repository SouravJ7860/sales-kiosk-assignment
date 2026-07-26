import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";

import Gallery from "../models/gallery.model.js";
import Video from "../models/video.model.js";
import Inventory from "../models/inventory.model.js";

dotenv.config();

await connectDB();

await Gallery.deleteMany();
await Video.deleteMany();
await Inventory.deleteMany();

await Gallery.insertMany([
  {
    title: "Main Entrance",
    imageUrl: "https://picsum.photos/id/1018/1000/600",
  },
  {
    title: "Club House",
    imageUrl: "https://picsum.photos/id/1015/1000/600",
  },
  {
    title: "Swimming Pool",
    imageUrl: "https://picsum.photos/id/1019/1000/600",
  },
  {
    title: "Garden",
    imageUrl: "https://picsum.photos/id/1020/1000/600",
  },
  {
    title: "Kids Play Area",
    imageUrl: "https://picsum.photos/id/1025/1000/600",
  },
]);

await Video.insertMany([
  {
    title: "Project Walkthrough",
    thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Amenities",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
]);

const inventory = [];

["A", "B", "C"].forEach((tower) => {
  for (let i = 1; i <= 10; i++) {
    inventory.push({
      tower,
      unitNumber: `${tower}-${100 + i}`,
      status: "AVAILABLE",
    });
  }
});

await Inventory.insertMany(inventory);

console.log("✅ Database Seeded Successfully");

mongoose.connection.close();