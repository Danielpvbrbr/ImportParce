const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const iconv = require('iconv-lite');
const Papa = require('papaparse');

const { getDbConnection } = require('./db');
const { montarPaciente } = require('./services/montarPaciente');
const { upsertPacienteLocal } = require('./services/upsertPacienteLocal');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
const db = getDbConnection();
const dbConectado = () => {

}

app.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM empresa`);
        console.log(`Conectado ao banco ${rows[0].RAZAO_SOCIAL}`)
        res.send(`Conectado ao banco ${rows[0].RAZAO_SOCIAL}`);
    } catch (error) {
        console.error('Erro na conexão com o banco:', error);
        res.status(500).send(`Erro ao conectar ao banco.`);
    }
});

app.get('/conn', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM empresa`);
        res.status(200).json({ data: rows[0] });

    } catch (error) {
        console.error('Erro na conexão com o banco:', error);
        res.status(500).send(`Erro ao conectar ao banco.`);
    }
});

app.post('/import', upload.single('file'), async (req, res) => {
    const pacientes = [];
    const mensagens = [];

    try {
        const [entreprise] = await db.query(`SELECT * FROM empresa `);
        const ID_EMPRESA = entreprise[0].ID_EMPRESA;

        const filePath = req.file.path;
        const originalName = req.file.originalname;
        const buffer = fs.readFileSync(filePath);

        let data = null;

        function parseCSV(buf, encoding) {
            const content = iconv.decode(buf, encoding);
            const result = Papa.parse(content, {
                header: true,
                skipEmptyLines: true,
                delimiter: ';',
            });
            return result.data;
        }

        try {
            data = parseCSV(buffer, 'utf-8');
            if (!data.length || JSON.stringify(data).includes('\x00')) throw new Error();
        } catch {
            try {
                data = parseCSV(buffer, 'latin1');
                if (!data.length || JSON.stringify(data).includes('\x00')) throw new Error();
            } catch {
                data = parseCSV(buffer, 'utf16-le');
            }
        }

        fs.unlinkSync(filePath);

        for (const row of data) {
            const paciente = await montarPaciente(row, db, ID_EMPRESA);
            if (paciente) {
                const msg = await upsertPacienteLocal(db, paciente);
                mensagens.push(msg);
                pacientes.push(paciente);
            }
        }

        res.json({
            logData: {
                mensagens,
                pacientes
            }
        });

    } catch (error) {
        console.error('Erro no /import:', error);
        res.status(500).json({ status: 'erro', mensagem: error.message });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
