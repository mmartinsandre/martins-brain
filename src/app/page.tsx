'use client'

import { useState, useEffect } from 'react';

const typingDelay = 150;
const initialDescription = "Este é o espaço dedicado a publicar meus principais projetos, aqui também deixo dicas e truques que podem ser usados no cotidiano, assim como reflexões diárias. Para Saber um pouco mais sobre minha carreira leia o artigo sobre.";
const welcomeMessage = "Olá, seja bem-vindo!";

export default function Home() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const typeCharacter = () => {
      if (typedText.length < welcomeMessage.length) {
        setTypedText(welcomeMessage.substring(0, typedText.length + 1));
      }
    };

    const timeoutId = setTimeout(typeCharacter, typingDelay);
    return () => clearTimeout(timeoutId);
  }, [typedText]);

  return (
    <>
      <Header />
      <Main typedText={typedText} description={initialDescription} />
    </>
  );
}

function Header() {
  return (
    <header className="fixed top-0 w-full z-10 p-5 md:px-64">
      <nav>
        <ul className="flex flex-row justify-around text-sm md:text-lg gap-6 bg-neutral-950 p-4">
          <li>Inicio</li>
          <li>Projetos</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>
    </header>
  );
}

function Main({ typedText, description }: { typedText: string, description: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around pt-24 pb-24 md:pt-16 md:pb-16 bg-neutral-950 overflow-hidden md:px-64">
      <TypedMessage message={typedText} />
      <Description description={description} />
    </main>
  );
}

function TypedMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-row w-screen justify-center items-center">
      <div className="flex flex-col bg-neutral-900 p-6 rounded-xl border-2 border-primary-500">
        <span className="text-md md:text-lg font-light text-justify">{message}</span>
      </div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return (
    <div className="flex flex-row justify-center items-center px-8">
      <div className="flex flex-col bg-neutral-900 p-4 rounded-xl p-4">
        <span className="text-xs md:text-lg font-light text-justify tracking-tight">{description}</span>
      </div>
    </div>
  );
}
