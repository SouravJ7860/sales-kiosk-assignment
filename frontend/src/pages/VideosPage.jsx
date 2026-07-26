import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

import { getVideos } from "../services/video.service";

import Spinner from "../components/Common/Spinner";
import ErrorState from "../components/Common/ErrorState";
import VideoCard from "../components/Videos/VideoCard";

function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      setLoading(true);
      setError("");

      const data = await getVideos();

      console.log("Videos:", data);

      setVideos(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load videos. Please try again.");
    } finally {
      setLoading(false);
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
          onRetry={loadVideos}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>Videos</h1>

      <div className="gallery-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default VideosPage;