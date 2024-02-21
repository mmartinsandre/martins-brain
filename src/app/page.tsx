'use client'

import { useState, useEffect } from 'react';

const typingDelay = 150;
const initialDescription = "Este é o espaço dedicado a publicar meus principais projetos, aqui também deixo dicas e truques que podem ser usados no cotidiano, assim como reflexões diárias. Para Saber um pouco mais sobre minha carreira leia o artigo sobre.";
const welcomeMessage = "Olá, seja bem-vindo!";
const modalMessage = "Ops! Isso ainda está sendo desenvolvido.";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const typeCharacter = () => {
      if (typedText.length < welcomeMessage.length) {
        setTypedText(welcomeMessage.substring(0, typedText.length + 1));
      }
    };

    const timeoutId = setTimeout(typeCharacter, typingDelay);
    return () => clearTimeout(timeoutId);
  }, [typedText]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Header onLinkClick={handleLinkClick} />
      <Main typedText={typedText} description={initialDescription} />
      {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

function Header({ onLinkClick }: { onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <header className="fixed top-0 w-full z-10 p-5 md:px-64">
      <nav>
        <ul className="flex flex-row justify-around text-sm md:text-lg gap-6 bg-neutral-950 p-4">
          <li>Inicio</li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>Projetos</a></li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>Sobre</a></li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>Contato</a></li>
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

function Modal({ message, onClose }: { message: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col bg-neutral-900 p-5 rounded-xl">
        <span className="text-md md:text-lg font-light text-justify">{message}</span>
        <button onClick={onClose} className="mt-4 py-2 bg-neutral-800 text-white rounded">Fechar</button>
      </div>
    </div>
  );
}