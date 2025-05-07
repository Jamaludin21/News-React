import { useState } from "react";

const translations = {
  en: {
    select_province: "Select Province",
    weather_loading: "Loading weather data...",
    temperature: "Temperature",
    precipitation: "Precipitation",
    current_location: "Your current location",
  },
  id: {
    select_province: "Pilih Provinsi",
    weather_loading: "Memuat data cuaca...",
    temperature: "Suhu",
    precipitation: "Curah Hujan",
    current_location: "Lokasi anda saat ini",
  },
};

export const useTranslations = (initialLang = "en") => {
  const [language, setLanguage] = useState(initialLang);

  const t = translations[language] || translations.en;

  const changeLanguage = (lang) => {
    if (translations[lang]) setLanguage(lang);
  };

  return { t, language, changeLanguage };
};
