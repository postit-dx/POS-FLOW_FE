export default function formatDate(d) {
    if (!d) return '';
    const date = new Date(d);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}.${MM}.${dd}`;
}

export function formatDateTime(d) {
    if (!d) return '';
    const date = new Date(d);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}.${MM}.${dd} ${HH}:${mm}:00`;
}