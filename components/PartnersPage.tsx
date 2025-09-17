import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { PartnerItem } from '../types';
import { BookOpenIcon, VideoCameraIcon, SubscriptionIcon } from './icons';

interface PageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    items: PartnerItem[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const ContentCard: React.FC<{ item: PartnerItem, onOpenSubscriptionModal: () => void }> = ({ item, onOpenSubscriptionModal }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-serif text-brand-primary mb-2">{item.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-4 border-b pb-6 mb-6">
                {item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-100 text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors"><VideoCameraIcon className="h-5 w-5"/> Assistir Vídeo</a>}
                {item.textUrl && <a href={item.textUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"><BookOpenIcon className="h-5 w-5"/> Visitar Site</a>}
            </div>
             <div className="text-center bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-brand-primary">Quer ser nosso parceiro?</h4>
                <p className="text-gray-600 my-2 text-sm">Assinantes do plano premium podem ter sua marca divulgada aqui. Apoie a cultura e ganhe visibilidade.</p>
                <button 
                    onClick={onOpenSubscriptionModal}
                    className="mt-2 inline-flex items-center gap-2 bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 shadow"
                >
                    <SubscriptionIcon className="h-5 w-5" />
                    Conheça Nossos Planos
                </button>
            </div>
        </div>
    </div>
);

const PartnersPage: React.FC<PageProps> = (props) => {
    const { onNavigateToMain, onNavigateToAdmin, onOpenSubscriptionModal, items } = props;

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader {...props} />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-serif text-brand-primary">Parceiros e Anunciantes</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Conheça as empresas e instituições que apoiam e acreditam no nosso projeto.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 justify-center items-center mb-12 p-3 bg-slate-100 rounded-lg">
                        <button onClick={onNavigateToMain} className="text-sm font-medium bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">Voltar ao Início</button>
                        <button onClick={() => alert('Funcionalidade para buscar novos conteúdos em desenvolvimento.')} className="text-sm font-medium bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">Novo Conteúdo</button>
                        <button onClick={() => alert('Funcionalidade para limpar a visualização em desenvolvimento.')} className="text-sm font-medium bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">Limpar</button>
                    </div>

                    <div className="space-y-12">
                        {items.length > 0 ? items.map(item => <ContentCard key={item.id} item={item} onOpenSubscriptionModal={onOpenSubscriptionModal}/>) : (
                            <div className="text-center bg-white p-10 rounded-lg shadow-md"><h3 className="text-xl font-semibold text-gray-700">Nenhum parceiro disponível.</h3></div>
                        )}
                    </div>
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
};

export default PartnersPage;