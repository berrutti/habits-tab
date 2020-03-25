export const getCurrentMiliseconds = () => new Date().getTime();

export const getDateString = (lastTimeClicked) => new Date(lastTimeClicked).toLocaleString();

export const getUpperbound = (timeframe) => timeframe * 86400000; // Milliseconds a day