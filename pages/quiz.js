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

    const [choice, setChoice] = useState(null);

    useEffect(() => {
        setChoice(null);
    }, [question])

    const Alternative = styled.div`
        background-color: ${({ theme, indexAlternative }) => {
            if (choice != null && choice == indexAlternative)
                if ( choice == question.answer)
                    return theme.colors.success;
                else
                    return theme.colors.wrong;
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
            background-color: ${({theme}) => choice == null && theme.colors.tertiary}
        }
    `;

    function verificarEscolha(escolha){
        if (choice == null)
            setChoice(escolha)
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
                    handleSubmit()
                }}>
                    {question.alternatives.map((item, index) => {
                        return (
                            <Alternative 
                                indexAlternative={index}
                                onClick={() => verificarEscolha(index)} >
                                {item}
                            </Alternative>)
                    })}
                    <Button>
                        {currentQuestion < totalQuestions ? "Próxima Pergunta" : "Voltar ao Início"}
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

    const [indexQuestion, setIndexQuestion] = useState(0);
    const [question, setQuestion] = useState(questions[0]);
    
    useEffect(() => {
        setQuestion(questions[indexQuestion]);
    }, [indexQuestion])

    function verificarEscolha() {
        alert('você escolheu uma resposta')
    }

    function proximaQuestion() {
        const nextIndexQuestion = indexQuestion + 1;
        
        if (nextIndexQuestion >= totalQuestions){
            router.push('/');
            return;
        }

        setIndexQuestion(nextIndexQuestion);
    }
    
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />
                <QuestionWidget 
                    question={question}
                    currentQuestion={indexQuestion + 1}
                    totalQuestions={totalQuestions}
                    handleSubmit={proximaQuestion}
                    handleChoise={verificarEscolha}
                />
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/miltoncabastos" />
        </QuizBackground>
    );
}