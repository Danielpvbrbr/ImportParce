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
    background-color:#fff;
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
`;

export const Percent = styled.div`
    width: 100%;
    height: ${val => val.Percent}%;
    background-color:${el => el.color};
    border-radius: 5px;
    margin-top: 8px;

    p{
        text-align: center;
    }
`;

export const Button = styled.button`
    width: 100%;
    height: 40px;
    background-color:${el => el.color};
    margin-top: 8px;
    border-radius: 0;
`;

export const BoxLogs = styled.div`
    width: 90%;
    height: 99%;
    display: flex;
    background-color:#fff;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #D9D9D9;
    gap: 4px;
    padding: 3px;

    h4{
        font-size: 7pt;
        color: #343D34;
        margin: 0;
    }

    section{
        height: 300px;
        border: 1px solid red;
        overflow-y:scroll;
    }
`;

export const Line = styled.div`
    width: 99%;
    height: 25px;
    display: flex;
    background-color:#D9D9D9;
    color: #fff;
    border-radius: 5px;
    padding-left: 4px;
    font-size: 11pt;
    /* background-color:#0BFF1B; */
`;