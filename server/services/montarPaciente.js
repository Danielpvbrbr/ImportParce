const { formatToSQLDateTime } = require('../function/formatToSQLDateTime');
const { getLeitoId } = require('./getLeitoId');

async function montarPaciente(row, db, ID_EMPRESA) {
  const NUMERO_QUARTO = row['Unidade de atendimento']?.trim() ?? null;
  const NUMERO_ANDAR = row['Setor atual']?.trim() ?? null;

  const idLeito = await getLeitoId({ db, NUMERO_QUARTO, NUMERO_ANDAR, ID_EMPRESA });

  return {
    NOME: row['Nome do paciente']?.trim() ?? null,
    INICIO_INTERNACAO: formatToSQLDateTime(row['Data entrada unidade']),
    CONVENIO: row['Convênio']?.trim() ?? null,
    ID_LEITO: idLeito,
    ATIVO: 1,
    MAX_VISITANTE: 10,
    NUMERO_QUARTO: NUMERO_QUARTO,
    QTD_ACOMPANHANTE: Number.isInteger(parseInt(row['Acompanhantes'])) ? parseInt(row['Acompanhantes']) : 0,
    NOME_MAE: row['Nome filiação 1']?.trim() ?? null,
    IDADE_PACIENTE: row['Idade'] ?? null,
    ID_EMPRESA: ID_EMPRESA,
    NUMERO_ANDAR: NUMERO_ANDAR
  };
}


module.exports = { montarPaciente }