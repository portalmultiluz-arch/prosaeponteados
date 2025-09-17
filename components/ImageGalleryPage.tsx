import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './icons';

interface PageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    images: GeneratedImage[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const ImageCard: React.FC<{ item: GeneratedImage }> = ({ item }) => (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={item.imageUrl} alt={item.prompt} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
            <p className="text-white text-sm line-clamp-3">{item.prompt}</p>
        </div>
    </div>
);

const ImageGalleryPage: React.FC<PageProps> = (props) => {
    const { onNavigateToMain, onNavigateToAdmin, images } = props;

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader {...props} />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-brand-primary">Galeria de Imagens (IA)</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                           Explore uma galeria de imagens únicas, todas criadas por nossa equipe utilizando Inteligência Artificial para ilustrar a cultura brasileira.
                        </p>
                        <button 
                            onClick={onNavigateToMain}
                            className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Voltar ao Início
                        </button>
                    </div>

                     {images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {images.map(item => (
                                <ImageCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center bg-white p-10 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Galeria Vazia.</h3>
                            <p className="text-gray-500 mt-2">Nossa equipe está criando novas imagens. Volte em breve para conferir as novidades!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
};

export default ImageGalleryPage;
