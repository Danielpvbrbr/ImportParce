const path = require('path');
const processExcel = require('./services/excelProcessor');
const { getDbConnection } = require('./db');

const FILES_DIR = path.join(__dirname, 'files');
const dbName = 'db19843929000100';

let processing = false;

async function executarProcessamento() {
    if (processing) {
        console.log('Processamento já está em andamento, pulando esta execução...');
        return;
    }
    processing = true;

    const db = getDbConnection(dbName);
    console.log(`Verificando planilhas em ${new Date().toLocaleTimeString()}...`);
    try {
        const result = await processExcel(db, FILES_DIR);
        console.log(`Processamento finalizado com ${result.jsonData.length} registros.`);
    } catch (err) {
        console.error(`Erro ao processar arquivos: ${err.message}`);
    } finally {
        processing = false;
    }
}

// Executa imediatamente ao iniciar
executarProcessamento();

// Executa a cada 1 minuto (60.000 ms)
setInterval(executarProcessamento, 60 * 1000);
