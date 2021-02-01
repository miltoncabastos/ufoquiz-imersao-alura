import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import db from '../db.json'

import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                router.push(`/quiz?name=${name}`)}
                }>
              <Input 
                placeholder="Digite o seu nome" 
                onChange={event => setName(event.target.value)}
                name="nomeDoUsuario"
                value={name}
              />

              <Button type="submit">
                  {`Vamos jogar ${name}`}
              </Button>
            </form>              
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/miltoncabastos" />
    </QuizBackground>
  );
}
