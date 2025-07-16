// Função para formatar data no padrão SQL
function formatToSQLDateTime(value) {
    if (!value) return null;

    if (typeof value === 'number') {
        const date = new Date((value - 25569) * 86400 * 1000);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    if (typeof value === 'string') {
        const [datePart, timePart = '00:00'] = value.trim().split(' ');
        const [d, m, y] = datePart.split('/');
        const fullYear = y.length === 2 ? `20${y}` : y;

        const timeParts = timePart.split(':');
        const hours = timeParts[0]?.padStart(2, '0') || '00';
        const minutes = timeParts[1]?.padStart(2, '0') || '00';
        const seconds = timeParts[2]?.padStart(2, '0') || '00';

        return `${fullYear}-${m.padStart(2, '0')}-${d.padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
    }

    return null;
}


module.exports = { formatToSQLDateTime }
