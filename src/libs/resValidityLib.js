function isBetween(start, end, date) {
    return date <= end && date >= start;
}

function spansRange(approvedStart, approvedEnd, startDate, endDate) {
    return startDate <= approvedStart && endDate >= approvedEnd;
}

export function isReservationValid(start, end, reservations) {
    const now = new Date().getTime();
    const startDate = new Date(start.replace(/-/g, '\/')).getTime();
    const endDate = new Date(end.replace(/-/g, '\/')).getTime();
    
    if (startDate < now ||
      endDate < now ||
      endDate < startDate) {

    }

    let valid = true;
    
    reservations.forEach(reservation => {
        const approvedStart = new Date(reservation.startDate.replace(/-/g, '\/')).getTime();
        const approvedEnd = new Date(reservation.endDate.replace(/-/g, '\/')).getTime();

        const startBetween = isBetween(approvedStart, approvedEnd, startDate) 
        const endBetween = isBetween(approvedStart, approvedEnd, endDate)
        const overlap = spansRange(approvedStart, approvedEnd, startDate, endDate);

        if (startBetween || endBetween || overlap) {
            valid = false;
        }
    });
    return valid;
}

