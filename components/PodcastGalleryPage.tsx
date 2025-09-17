import React, { useState } from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { GeneratedPodcast } from '../types';
import { PlayIcon, StopIcon, XIcon } from './icons';

interface PageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    podcasts: GeneratedPodcast[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const PodcastCard: React.FC<{ item: GeneratedPodcast, onSelect: () => void }> = ({ item, onSelect }) => (
    <div 
        className="group cursor-pointer bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        onClick={onSelect}
    >
        <h3 className="text-xl font-bold font-serif text-brand-primary">{item.topic}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{item.script}</p>
        <div className="text-xs text-gray-400 mt-4">
            Criado em: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </div>
    </div>
);

const PodcastModal: React.FC<{ item: GeneratedPodcast, onClose: () => void }> = ({ item, onClose }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleAudio = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(item.script.replace(/(\*\*|__|\*|_|#)/g, ''));
            utterance.lang = 'pt-BR';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };
    
    // Cleanup speech synthesis on component unmount
    React.useEffect(() => {
        return () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-auto flex flex-col max-h-[90vh] overflow-hidden transform animate-fade-in-scale" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-serif text-brand-primary">{item.topic}</h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><XIcon className="h-6 w-6" /></button>
                </div>
                <div className="p-6 flex-grow overflow-y-auto" dangerouslySetInnerHTML={{ __html: item.script.replace(/\n/g, '<br />').replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') }} />
                <div className="p-4 bg-slate-50 border-t flex justify-end">
                    <button onClick={handleAudio} className="flex items-center gap-2 bg-brand-secondary text-white font-bold py-2 px-5 rounded-lg hover:bg-brand-primary transition-colors">
                        {isSpeaking ? <><StopIcon className="h-5 w-5" /> Parar</> : <><PlayIcon className="h-5 w-5" /> Ouvir</>}
                    </button>
                </div>
            </div>
        </div>
    );
};


const PodcastGalleryPage: React.FC<PageProps> = (props) => {
    const { onNavigateToMain, onNavigateToAdmin, podcasts } = props;
    const [selectedPodcast, setSelectedPodcast] = useState<GeneratedPodcast | null>(null);

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader {...props} />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-brand-primary">Galeria de Podcasts (IA)</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                           Ouça e leia roteiros e conteúdos sobre a cultura brasileira, gerados por nossa equipe com o poder da Inteligência Artificial.
                        </p>
                        <button 
                            onClick={onNavigateToMain}
                            className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Voltar ao Início
                        </button>
                    </div>

                     {podcasts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {podcasts.map(item => (
                                <PodcastCard key={item.id} item={item} onSelect={() => setSelectedPodcast(item)} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center bg-white p-10 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Galeria Vazia.</h3>
                            <p className="text-gray-500 mt-2">Nossa equipe está produzindo novos roteiros. Volte em breve para conferir as novidades!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
            {selectedPodcast && <PodcastModal item={selectedPodcast} onClose={() => setSelectedPodcast(null)} />}
        </div>
    );
};

export default PodcastGalleryPage;
