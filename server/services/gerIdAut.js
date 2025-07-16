const gerIdAut = async (db) => {// Essa função acessa o banco paciente_local e mapea todos os id, sé tiver
    try {
        const [rows] = await db.query(`SELECT ID_PACIENTE FROM pacientes_local`);
        const existingIds = rows.map(row => row.ID_PACIENTE);

        let newId = 1;

        while (existingIds.includes(newId)) {
            newId++;
        }

        return newId;
    } catch (err) {
        console.error("Erro ao buscar IDs:", err);
    }
};

module.exports = { gerIdAut };
