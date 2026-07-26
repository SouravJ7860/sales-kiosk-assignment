import api from "./api";

export const bookUnit = (bookingData) => {
  return api.post("/book", bookingData);
};


