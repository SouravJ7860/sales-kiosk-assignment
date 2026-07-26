import api from "./api";

export const getVideos = async () => {
    const response = await api.get("/videos");
    return response.data;
};