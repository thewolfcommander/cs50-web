function timeDiff(startDate, endDate) {
    const diffMs = (endDate - startDate);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

    if (diffDays > 0) {
        return `${diffDays} ${diffDays===1 ? 'day': 'days'}`;
    } else if (diffHrs > 0) {
        return `${diffHrs} ${diffHrs===1 ? 'hour': 'hours'}`;
    } else {
        return `${diffMins} ${diffMins===1 ? 'min': 'mins'}`;
    }
}

export default timeDiff;