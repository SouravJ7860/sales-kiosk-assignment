import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import { getGallery } from "../services/gallery.service";

import ImageCard from "../components/Gallery/ImageCard";
import ImageModal from "../components/Gallery/ImageModal";
import Spinner from "../components/Common/Spinner";
import ErrorState from "../components/Common/ErrorState";
import socket from "../socket/socket";

function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadGallery();

    socket.on("gallery:open", (image) => {
      setSelectedImage(image);
    });

    socket.on("gallery:close", () => {
      setSelectedImage(null);
    });

    return () => {
      socket.off("gallery:open");
      socket.off("gallery:close");
    };
  }, []);


  async function loadGallery() {
    try {
      setLoading(true);
      setError("");

      const data = await getGallery();

      setGallery(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  }

  function handleImageClick(image) {
    setSelectedImage(image);

    socket.emit("gallery:open", image);
  }

  function handleModalClose() {
    setSelectedImage(null);

    socket.emit("gallery:close");
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
          onRetry={loadGallery}
        />
      </MainLayout>
    );
  }


  return (
    <MainLayout>
      <h1>Gallery</h1>

      <div className="gallery-grid">
        {gallery.map((item) => (
          <ImageCard
            key={item._id}
            image={item}
            onClick={handleImageClick}
          />
        ))}
      </div>

      <ImageModal
        image={selectedImage}
        onClose={handleModalClose}
      />
    </MainLayout>
  );
}

export default GalleryPage;