export const getVideoByWeatherCode = (code) => {
  console.log(code);
  if (code === 0) {
    return "https://cdn.coverr.co/videos/coverr-sunny-day-1640213324691/1080p.mp4";
  } else if ([1, 2, 3].includes(code)) {
    return "https://cdn.coverr.co/videos/coverr-cloudy-sky-1637827332210/1080p.mp4";
  } else if ([61, 63, 65, 80, 81, 82].includes(code)) {
    return "https://cdn.coverr.co/videos/coverr-rain-on-glass-1636715165056/1080p.mp4";
  }
  return "https://cdn.coverr.co/videos/coverr-nature-blur-1637315227874/1080p.mp4";
};
