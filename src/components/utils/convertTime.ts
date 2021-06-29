export function convertSecondsToMinutes(time: number): string {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);

    const result = [minutes, seconds]
    .map(unit => String(unit).padStart(2,'0'))
    .join(':')

    return result;

}

export function convertMinutesToHours(time: number): string {
    const hours = Math.floor(time/60);
    const minutes = Math.floor(time%60);

    const result = [hours, minutes]
    .map(unit => String(unit).padStart(2,'0'))
    .join(':')

    return result;

}