const getLeitoId = async ({ db, NUMERO_QUARTO, NUMERO_ANDAR, ID_EMPRESA }) => {

    if (!NUMERO_QUARTO) return null;

    try {
        // Tenta encontrar o leito existente
        const [rows] = await db.query('SELECT ID_LEITO FROM leito WHERE NUMERO_QUARTO LIKE ? LIMIT 1',
            [`%${NUMERO_QUARTO}%`]);

        if (rows.length > 0) {
            return rows[0].ID_LEITO; // Já existe
        }

        // Se não encontrou, cria novo leito
        const [result] = await db.query('INSERT INTO leito (NUMERO_QUARTO, NUMERO_ANDAR, ID_EMPRESA) VALUES (?,?,?)',
            [NUMERO_QUARTO, NUMERO_ANDAR, ID_EMPRESA]
        );

        return result.insertId; // Retorna o novo ID_LEITO

    } catch (err) {
        console.error(`Erro ao obter ou criar ID_LEITO para "${NUMERO_QUARTO}":`, err);
        return null;
    }
};

module.exports = { getLeitoId };