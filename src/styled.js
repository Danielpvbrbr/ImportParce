import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Area = styled.div`
    width: 1000px;
    height: 90%;
    background-color: #D9D9D9;
    border-radius:1rem;
    box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 6%);

    h4{
        text-align: end;
        font-size: 7pt;
        margin: 0;
        font-weight: 400;
        margin-top:7px;
        margin-right: 10px;
    }
        
`;

export const HeaderArea = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1{
        font-size: 14pt;
        color: #343D34;
    }
`;

export const Box = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
  
`;

export const BoxAnexo = styled.div`
    width: 380px;
    height: 100%;
    background-color: #343D34;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
`;

export const Anexo = styled.div`
    width: 280px;
    height: 190px;
    background-color:#f1f1f1;
    box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 30%);
    border-radius: 5px;
    margin-top: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #000;
    cursor: pointer;

    section{
        display: flex;
        flex-direction: column;
        height: 40px;
        display: flex;
        justify-content: center;

        p{
            text-align: center;
            margin: 0;
            font-size: 10pt;
        }
    }
`;

export const Progress = styled.div`
    width: 70px;
    height: 190px;
    background-color:#fff;
    border-radius: 5px;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: end;
    box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 30%);
`;

export const Percent = styled.div`
    width: 100%;
    height: ${val => val.Percent}%;
    background-color:${el => el.color};
    border-radius: 4px;
    margin-top: 8px;

    p{
        text-align: center;
    }
`;

export const Button = styled.button`
    width: 95%;
    height: 40px;
    background-color:${el => el.color};
    box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 30%);
    margin-top: 8px;
    border-radius: 5px;
    margin-bottom: 6px;
    border: none;
    outline: none;
    cursor: pointer;
`;

export const BoxLogs = styled.div`
    width: 90%;
    height: 100%;
    background-color:#f1f1f1;
    border-right: 1px solid #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;

    span h4{
        font-size: 15pt;
        color: #343D34;
        margin: 0;
        opacity: 0.5;
        text-align: center;
    }

    span h5{
        font-size: 8pt;
        color: #343D34;
        margin: 0;
        opacity: 0.5;
        text-align: center;
    }
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 3px;
        width: 99%;
        height: 97%;
        overflow-y: auto;
    }
`;

export const Line = styled.div`
    width: 99%;
    height: 25px;
    display: flex;
    background-color:#343D34;
    color: #fff;
    border-radius: 5px;
    padding-left: 4px;
    font-size: 11pt;
    /* background-color:#0BFF1B; */
`;