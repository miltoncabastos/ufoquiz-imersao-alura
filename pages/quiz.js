import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import db from '../db.json'

import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

function QuestionWidget({
    question, 
    currentQuestion, 
    totalQuestions, 
    handleSubmit
}) {

    const [choice, setChoice] = useState();
    const [sendingChoice, setSendingChoice] = useState(false);

    useEffect(() => {
        setChoice();
        setSendingChoice(false);
    }, [question])

    const Alternative = styled.div`
        background-color: ${({ theme, indexAlternative }) => {
            if (sendingChoice && choice == indexAlternative)
            {
                if (choice == question.answer)
                    return theme.colors.success;
                
                    return theme.colors.wrong;
            }

            if (choice != undefined && choice == indexAlternative)
                return theme.colors.tertiary;

            return theme.colors.secondary;
        }};
        border: none;
        border-radius: 5px;
        color: white;
        padding: 10px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        margin-top: 5px;
        width: 100%;
        &:hover{
            background-color: ${({theme}) => theme.colors.tertiary}
        }
    `;

    function verificarEscolha(escolha){
        setChoice(escolha)
    }

    function sendChoice(){
        setSendingChoice(true);
        handleSubmit(choice);
    }

    return (
        <Widget>
            <Widget.Header>
                <h1>{`pergunta ${currentQuestion} de ${totalQuestions}`}</h1>
            </Widget.Header>
            <img
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                <form onSubmit={event => {
                    event.preventDefault()
                    sendChoice()
                }}>
                    {question.alternatives.map((item, index) => {
                        return (
                            <Alternative
                                key={index}
                                indexAlternative={index}
                                onClick={() => verificarEscolha(index)} >
                                {item}
                            </Alternative>)
                    })}
                    <Button type="submit" disabled={choice == undefined}>
                        Enviar Resposta
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    )
}

function FinalQuiz({
    totalQuestions,
    totalSuccess,
    handleSubmit,
}){
    const emoji = String.fromCodePoint(0x0001F47D)
    return (
        <Widget>
            <Widget.Header>
                <h1>{db.title}</h1>
            </Widget.Header>           
            <Widget.Content>
                <form onSubmit={event => {
                    event.preventDefault();
                    handleSubmit();
                }}>
                    <h3>Você finalizou o quiz!</h3>

                    {totalSuccess == totalQuestions && <>
                        <p>Fantástico, você acertou todas as perguntas!</p>
                        <p>Tem certeza que você é mesmo deste mundo?</p>
                    </>}

                    {totalSuccess != totalQuestions && <>
                            <p>Você acertou {totalSuccess} de {totalQuestions} respostas</p>
                            <p>Treine mais para ter um contato imediato {emoji}</p>
                    </>}
                    
                    <Button type='submit'>
                        Voltar ao Início
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    )
}

export default function QuizPage() {
    const router = useRouter();

    const questions = db.questions;
    const totalQuestions = questions.length;
    
    const [totalSuccess, setTotalSuccess] = useState(0);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [question, setQuestion] = useState(questions[0]);
    const [endGame, setEndGame] = useState(false);
    
    useEffect(() => {
        setQuestion(questions[indexQuestion]);
    }, [indexQuestion])

    function goHome(){
        router.push('/');
    }
    
    function sendQuestion(choise) {
        setTimeout(() => {
            if (choise == question.answer){
                const total = totalSuccess + 1;
                setTotalSuccess(total)
            }
            
            const nextIndexQuestion = indexQuestion + 1;
            
            if (nextIndexQuestion >= totalQuestions)
            setEndGame(true);
            else
            setIndexQuestion(nextIndexQuestion);
        }, 1 * 1000);
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                {!endGame && <QuestionWidget 
                    question={question}
                    currentQuestion={indexQuestion + 1}
                    totalQuestions={totalQuestions}
                    handleSubmit={sendQuestion}
                />}
                {endGame && <FinalQuiz
                    totalQuestions={totalQuestions}
                    totalSuccess={totalSuccess}
                    handleSubmit={goHome}
                />}
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/miltoncabastos" />
        </QuizBackground>
    );
}