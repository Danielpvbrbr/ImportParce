import { useRef, useState } from 'react'
import {
  Container,
  Area,
  BoxAnexo,
  Anexo,
  Progress,
  Percent,
  Button,
  HeaderArea,
  Box,
  BoxLogs,
  Line
} from './styled'


import axios from 'axios'

function App() {
  const [perc, setPerc] = useState(0)
  const [fileCsv, setFileCsv] = useState(null);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("Alfabética")
  const fileRef = useRef(null)

  const handleSubmit = () => {
    if (!fileCsv) {
      alert("Nenhum arquivo selecionado.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileCsv);

    setPerc(0);
    setData([]);

    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += 1;
      setPerc(prev => {
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 100);

    axios.post("http://localhost:5000/import", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        clearInterval(interval);
        setPerc(100);
        setData(response.data.logData);
        console.log(response.data.logData);
      })
      .catch(error => {
        clearInterval(interval);
        setPerc(0);
        console.error("Erro ao enviar o arquivo:", error);
        alert("Erro ao enviar o arquivo. Verifique o console.");
      });
  };

  const handleColet = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fName = file.name.toLowerCase();
    setFileName(fName)

    if (!fName.includes("alfabética")) {
      alert("Erro: Arquivo inválido");
      return;
    }

    setFileCsv(file)
  };


  return (
    <Container className="read-the-docs">
      <Area>
        <HeaderArea>
          <h1>Sistema de importação do ASLSysControl</h1>
        </HeaderArea>
        <Box>
          <BoxAnexo>
            <Anexo onClick={() => fileRef.current.click()}>
              <section>
                <p>{fileName}</p>
                <p>Buscar arquivo</p>
              </section>
            </Anexo>
            <Progress>
              <Percent Percent={perc} color={perc === 100 ? "#0BFF1B" : "#fd4a03"}>
                <p>{perc}%</p>
              </Percent>
            </Progress>
            <input
              type='file'
              accept='.csv'
              style={{ display: "none" }}
              onChange={handleColet}
              ref={fileRef}
            />
            <Button
              onClick={handleSubmit}
              color={perc === 100 ? "#0BFF1B" : "#fd4a03"}>Enviar</Button>
          </BoxAnexo>
          <BoxLogs>
            <h4>REGISTRO DE LOGS</h4>
            <section>
              {data?.mensagens?.map((v, i) =>
                <Line key={i}>{v}</Line>
              )}
            </section>

          </BoxLogs>
        </Box>
      </Area>
    </Container>
  )
}

export default App
