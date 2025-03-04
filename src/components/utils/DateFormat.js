export function formatDateWithDots(d) {  /* 'YYYY-MM-DD' -> 'YYYY.MM.DD' */
    if (!d) return '';
    const date = new Date(d);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}.${MM}.${dd}`;
}

export function formatDateTimeWithDots(d) { /* 'YYYY-MM-DD HH:MM:00' */
    if (!d) return '';
    const date = new Date(d);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}.${MM}.${dd} ${HH}:${mm}:00`;
}

export function formatToDashDate(d) { /* 'YYYY.MM.DD' -> 'YYYY-MM-DD' */
    const [year, month, day] = d.split('.');
}
