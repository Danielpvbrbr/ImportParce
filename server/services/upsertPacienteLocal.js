const { gerIdAut } = require("./gerIdAut");

async function verificarOuAtualizarNumeroAndar(db) {
    try {
        const [rows] = await db.query(`
            SELECT CHARACTER_MAXIMUM_LENGTH 
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = 'pacientes_local'
              AND COLUMN_NAME = 'NUMERO_ANDAR'
        `);

        const atual = rows?.[0]?.CHARACTER_MAXIMUM_LENGTH ?? 0;

        if (atual < 55) {
            await db.query(`ALTER TABLE pacientes_local MODIFY NUMERO_ANDAR VARCHAR(55)`);
            console.log('Coluna NUMERO_ANDAR atualizada para VARCHAR(55)');
        }
    } catch (err) {
        console.error('Erro ao verificar/alterar NUMERO_ANDAR:', err.message);
    }
}

const upsertPacienteLocal = async (db, paciente) => {
    // Evita inserção/atualização se o nome estiver ausente
    if (!paciente.NOME || paciente.NOME.trim() === '') {
        return `Paciente ignorado: nome ausente ou inválido.`;
    }

    await verificarOuAtualizarNumeroAndar(db);

    const idGer = await gerIdAut(db)

    try {
        const [existing] = await db.query(
            'SELECT ID_PACIENTE, NUMERO_QUARTO FROM pacientes_local WHERE NOME = ? AND IDADE_PACIENTE = ? AND ATIVO = 1 LIMIT 1',
            [paciente.NOME, paciente.IDADE_PACIENTE]
        );

        if (existing.length > 0) {
            const registroAtual = existing[0];
            if (registroAtual.NUMERO_QUARTO === paciente.NUMERO_QUARTO) {

                await db.query(
                    `UPDATE pacientes_local SET NOME = ?, CONVENIO = ?, MAX_VISITANTE = ?, QTD_ACOMPANHANTE = ?, NOME_MAE = ? WHERE ID_PACIENTE = ?`,
                    [
                        paciente.NOME,
                        paciente.CONVENIO,
                        paciente.MAX_VISITANTE,
                        paciente.QTD_ACOMPANHANTE,
                        paciente.NOME_MAE,
                        registroAtual.ID_PACIENTE
                    ]
                );
                return `Paciente ${paciente.NOME} atualizado no mesmo quarto`;
            }

            await db.query('UPDATE pacientes_local SET ATIVO = 0 WHERE ID_PACIENTE = ?', [registroAtual.ID_PACIENTE]);
        }

        if (paciente.ID_LEITO) {
            const [ocupado] = await db.query(
                'SELECT ID_PACIENTE, NOME FROM pacientes_local WHERE ID_LEITO = ? AND ATIVO = 1 LIMIT 1', [paciente.ID_LEITO]
            );

            if (ocupado.length > 0) {
                await db.query('UPDATE pacientes_local SET ATIVO = 0 WHERE ID_PACIENTE = ?', [ocupado[0].ID_PACIENTE]);
            }
        }

        await db.query(
            `INSERT INTO pacientes_local 
            (ID_PACIENTE, NOME, INICIO_INTERNACAO, CONVENIO, ID_LEITO, ATIVO, MAX_VISITANTE, NUMERO_QUARTO, QTD_ACOMPANHANTE, NOME_MAE, IDADE_PACIENTE, ID_EMPRESA, NUMERO_ANDAR) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                idGer,
                paciente.NOME,
                paciente.INICIO_INTERNACAO,
                paciente.CONVENIO,
                paciente.ID_LEITO,
                1,
                paciente.MAX_VISITANTE,
                paciente.NUMERO_QUARTO,
                paciente.QTD_ACOMPANHANTE,
                paciente.NOME_MAE,
                paciente.IDADE_PACIENTE,
                paciente.ID_EMPRESA,
                paciente.NUMERO_ANDAR
            ]
        );
        return `Paciente ${paciente.NOME} adicionado com sucesso no quarto ${paciente.NUMERO_QUARTO}`;
    } catch (error) {
        console.log(`Erro ao atualizar paciente ${paciente.NOME}: ${error.message}`)
        return `Erro ao atualizar paciente ${paciente.NOME}: ${error.message}`;
    }
};

module.exports = { upsertPacienteLocal };
