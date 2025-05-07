import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLocation(null);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, getLocation };
};
