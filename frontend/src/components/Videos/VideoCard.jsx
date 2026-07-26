import { useEffect, useRef } from "react";
import socket from "../../socket/socket";

function VideoCard({ video }) {
    const videoRef = useRef(null);
    const isRemoteAction = useRef(false);

    useEffect(() => {
        function handlePlay(data) {
            console.log("Browser B received video:play", data);

            if (data.videoId !== video._id) return;

            console.log("Matched video:", video._id);

            const player = videoRef.current;
            console.log("Player:", player);

            player.currentTime = data.currentTime || 0;
            
            player.play()
                .then(() => {
                    console.log("Video started successfully");
                })
                .catch((err) => {
                    console.error("Play failed:", err.name, err.message);
                });
        }

        function handlePause(data) {
            if (data.videoId !== video._id) return;

            isRemoteAction.current = true;
            videoRef.current?.pause();
        }

        socket.on("video:play", handlePlay);
        socket.on("video:pause", handlePause);

        return () => {
            socket.off("video:play", handlePlay);
            socket.off("video:pause", handlePause);
        };
    }, [video._id]);

    function onPlay() {
        if (isRemoteAction.current) {
            isRemoteAction.current = false;
            return;
        }

        socket.emit("video:play", {
            videoId: video._id,
            currentTime: videoRef.current.currentTime,
        });
    }

    function onPause() {
        if (isRemoteAction.current) {
            isRemoteAction.current = false;
            return;
        }

        socket.emit("video:pause", {
            videoId: video._id,
        });
    }

    return (
        <div className="video-card">
            <video
                ref={videoRef}
                controls
                width="100%"
                poster={video.thumbnail}
                onPlay={onPlay}
                onPause={onPause}
            >
                <source src={video.videoUrl} type="video/mp4" />
            </video>

            <h3>{video.title}</h3>
        </div>
    );
}

export default VideoCard;