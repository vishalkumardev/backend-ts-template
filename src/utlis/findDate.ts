const findDateRange = (value: string) => {
    let endDate = new Date();
    let startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
    );

    const v = parseInt(value);

    if (v === 0) {
        // Today
        startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
        );
    } else if (v === 1) {
        // Yesterday
        startDate.setDate(endDate.getDate() - 1);
        endDate.setDate(endDate.getDate() - 1);
    } else if (v === 2) {
        // This week (Sunday to today)
        startDate.setDate(endDate.getDate() - endDate.getDay());
    } else if (v === 3) {
        // This month (1st of this month to today)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    } else if (v === 4) {
        // This quarter (1st of this quarter to today)
        const quarterStartMonth = Math.floor(endDate.getMonth() / 3) * 3;
        startDate = new Date(endDate.getFullYear(), quarterStartMonth, 1);
    } else if (v === 5) {
        // This half-year (1st of this half-year to today)
        const halfYearStartMonth = endDate.getMonth() < 6 ? 0 : 6;
        startDate = new Date(endDate.getFullYear(), halfYearStartMonth, 1);
    } else if (v === 6) {
        // This year (1st of January to today)
        startDate = new Date(endDate.getFullYear(), 0, 1);
    } else if (v === 7) {
        // Last week (Sunday to Saturday of last week)
        const dayOfWeek = endDate.getDay();
        endDate.setDate(endDate.getDate() - dayOfWeek - 1);
        startDate.setDate(endDate.getDate() - 6);
    } else if (v === 8) {
        // Last month (1st to last day of last month)
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    } else if (v === 9) {
        // Last quarter (1st to last day of last quarter)
        const quarterStartMonth = Math.floor(endDate.getMonth() / 3) * 3;
        startDate = new Date(endDate.getFullYear(), quarterStartMonth - 3, 1);
        endDate = new Date(endDate.getFullYear(), quarterStartMonth, 0);
    } else if (v === 10) {
        // Last half-year (1st to last day of last half-year)
        const halfYearStartMonth = endDate.getMonth() < 6 ? -6 : 0;
        startDate = new Date(endDate.getFullYear(), halfYearStartMonth, 1);
        endDate = new Date(endDate.getFullYear(), halfYearStartMonth + 6, 0);
    } else if (v === 11) {
        // Last year (1st of January to last day of December last year)
        startDate = new Date(endDate.getFullYear() - 1, 0, 1);
        endDate = new Date(endDate.getFullYear() - 1, 11, 31);
    }

    return { startDate, endDate };
};

export default findDateRange;
