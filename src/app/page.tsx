'use client'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
  const initialLanguage: Language = storedLanguage as Language || "pt-br";
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [typedText, setTypedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    "pt-br": {
      welcomeMessage: "Olá, seja bem-vindo!",
      initialDescription: "Este é o espaço dedicado a publicar meus principais projetos, aqui também deixo dicas e truques que podem ser usados no cotidiano, assim como reflexões diárias. Para Saber um pouco mais sobre minha carreira leia o artigo sobre.",
      modalMessage: "Ops! Isso ainda está sendo desenvolvido.",
      navLinks: {
        home: "Inicio",
        feed: "Feed",
        projects: "Projetos",
        about: "Sobre"
      }
    },
    "en-us": {
      welcomeMessage: "Hello, welcome!",
      initialDescription: "This is the space dedicated to publishing my main projects, here I also leave tips and tricks that can be used in everyday life, as well as daily reflections. To know a little more about my career read the article about.",
      modalMessage: "Oops! This is still being developed.",
      navLinks: {
        home: "Home",
        feed: "Feed",
        projects: "Projects",
        about: "About"
      }
    }
  };

  const { welcomeMessage, initialDescription, modalMessage, navLinks } = translations[language];

  const toggleLanguage = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newLanguage = language === "pt-br" ? "en-us" : "pt-br";
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      setIsLoading(false);
      setTypedText("");
    }, 1000);
  };

  const typingDelay = 150;
  type Language = "pt-br" | "en-us";

  useEffect(() => {
    const typeCharacter = () => {
      if (typedText.length < welcomeMessage.length) {
        setTypedText(welcomeMessage.substring(0, typedText.length + 1));
      }
    };

    const timeoutId = setTimeout(typeCharacter, typingDelay);
    return () => clearTimeout(timeoutId);
  }, [typedText, welcomeMessage]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
      <Header navLinks={navLinks} onLinkClick={handleLinkClick} onToggleLanguage={toggleLanguage} />
      <Main typedText={typedText} description={initialDescription} onToggleLanguage={toggleLanguage} />
    </>
  );
}

function Header({ navLinks, onLinkClick, onToggleLanguage }: { navLinks: { home: string, feed: string, projects: string, about: string }, onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>) => void, onToggleLanguage: () => void }) {
  return (
    <header className="fixed top-0 w-full z-10 p-5 md:px-64">
      <nav>
        <ul className="flex flex-row justify-around text-sm md:justify-center md:text-lg md:gap-x-24 gap-x-0.5 bg-neutral-950 p-4">
          <li className='font-extrabold border-b-2 border-primary-500'>{navLinks.home}</li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>{navLinks.feed}</a></li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>{navLinks.projects}</a></li>
          <li><a href="#" onClick={(e) => onLinkClick(e)}>{navLinks.about}</a></li>
        </ul>
      </nav>
    </header>
  );
}

function Main({ typedText, description, onToggleLanguage }: { typedText: string, description: string, onToggleLanguage: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around pt-24 pb-24 md:pt-16 md:pb-16 bg-neutral-950 overflow-hidden md:px-64">
      <TypedMessage message={typedText} onToggleLanguage={onToggleLanguage} />
      <Description description={description} />
    </main>
  );
}

function TypedMessage({ message, onToggleLanguage }: { message: string, onToggleLanguage: () => void }) {
  return (
    <>
      <button onClick={onToggleLanguage} aria-label="Change language">
          <FontAwesomeIcon icon={faEarth} className="text-2xl" />
      </button>
      <div className="flex flex-row w-screen justify-center items-center">
        <div className="flex flex-col bg-neutral-900 p-6 rounded-xl border-2 border-primary-500">
          <span className="text-md md:text-lg font-light text-justify">{message}</span>
        </div>
      </div>
    </>
  );
}

function Description({ description }: { description: string }) {
  return (
    <div className="flex flex-row justify-center items-center px-8">
      <div className="flex flex-col bg-neutral-900 p-4 rounded-xl p-4">
        <span className="text-xs md:text-lg font-light text-justify md:tracking-tighter">{description}</span>
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

function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="flex justify-center items-center mt-20">
        <div className="border-neutral-700 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    </div>
  );
}
