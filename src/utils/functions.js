export const getCurrentMiliseconds = () => new Date().getTime();

export const getDateString = (lastTimeClicked) => new Date(lastTimeClicked).toLocaleString();

export const getUpperbound = (timeframe) => {
    console.log('timeframe recieved',timeframe);
    console.log(timeframe * 86400000);
    return timeframe * 86400000
}; // Milliseconds a day