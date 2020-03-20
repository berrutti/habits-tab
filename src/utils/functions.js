export const getCurrentMiliseconds = () => new Date().getTime();

export const getDateString = (lastTimeClicked) => new Date(lastTimeClicked).toLocaleString();