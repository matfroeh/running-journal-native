export const getDatesBetween = (
    startDate: Date | string,
    endDate: Date | string
): Date[] => {
    let dates: Date[] = [];

    // if the start date is after the end date, return an empty array
    if (startDate > endDate) {
        return dates;
    }

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }
    return dates;
};

export const addDays = (date: Date, days: number): Date => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
