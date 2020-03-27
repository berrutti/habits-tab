export const getCurrentMiliseconds = (): number => new Date().getTime();

export const getDateString = (lastTimeClicked: number): string => new Date(lastTimeClicked).toLocaleString();

export const getUpperbound = (timeframe: number): number => timeframe * 86400000; // Milliseconds a day
