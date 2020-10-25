const millisecondsInADay = 86400000;

export const getCurrentMilliseconds = (): number => new Date().getTime();

export const getDateString = (lastTimeClicked: number): string => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric'
    };
    const dateToFormat = new Date(lastTimeClicked);
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(dateToFormat);
}

export const getUpperbound = (timeframe: number): number => timeframe * millisecondsInADay;
