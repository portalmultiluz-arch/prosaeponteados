import React, { useState } from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { Product } from '../types';
import { XIcon, VideoCameraIcon, MailIcon, SubscriptionIcon } from './icons';

interface ProductsAndServicesPageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    products: Product[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const ProductCard: React.FC<{ product: Product, onSelect: () => void }> = ({ product, onSelect }) => (
    <div 
        className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
        onClick={onSelect}
    >
        <div className="relative h-56">
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white border-2 border-white rounded-full px-4 py-2 text-sm font-bold opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-90 transition-all duration-300">
                    Ver Detalhes
                </div>
            </div>
        </div>
        <div className="p-5">
            <span className="inline-block bg-brand-accent/20 text-brand-primary text-xs font-semibold px-2 py-1 rounded-full mb-2">{product.type}</span>
            <h3 className="text-xl font-bold font-serif text-brand-primary">{product.title}</h3>
            <p className="text-gray-600 mt-1 text-sm">{product.tagline}</p>
        </div>
    </div>
);

const ProductModal: React.FC<{ product: Product, onClose: () => void, onOpenSubscriptionModal: () => void }> = ({ product, onClose, onOpenSubscriptionModal }) => (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
        onClick={onClose}
    >
        <div 
            className="bg-brand-bg rounded-lg shadow-2xl max-w-4xl w-full mx-auto flex flex-col max-h-[95vh] overflow-hidden transform animate-fade-in-scale"
            onClick={e => e.stopPropagation()}
        >
            <div className="relative">
                <button onClick={onClose} className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 z-20" aria-label="Fechar modal">
                    <XIcon className="h-6 w-6" />
                </button>
                {product.videoUrl ? (
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe 
                            src={product.videoUrl} 
                            title={product.title} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                ) : (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover" />
                )}
            </div>
            <div className="flex-grow overflow-y-auto p-8">
                <span className="inline-block bg-brand-accent/20 text-brand-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">{product.type}</span>
                <h2 className="text-3xl font-serif text-brand-primary mb-2">{product.title}</h2>
                <p className="text-2xl font-sans font-semibold text-brand-secondary mb-4">{product.price}</p>
                <div className="prose max-w-none text-gray-700">
                    <p>{product.description}</p>
                </div>
            </div>
            <div className="flex-shrink-0 mt-auto p-6 bg-white border-t flex flex-wrap gap-4 justify-end items-center">
                <a 
                    href="mailto:prosaeponteado@gmail.com?subject=Interesse em [Produto/Serviço]"
                    className="flex items-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 px-5 rounded-lg hover:bg-slate-200 transition-colors"
                >
                    <MailIcon className="h-5 w-5"/>
                    Tenho Interesse
                </a>
                <button 
                    onClick={onOpenSubscriptionModal}
                    className="flex items-center gap-2 bg-brand-secondary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-primary transition-colors"
                >
                   <SubscriptionIcon className="h-5 w-5"/>
                    Ver Planos de Assinatura
                </button>
            </div>
        </div>
    </div>
);

const ProductsAndServicesPage: React.FC<ProductsAndServicesPageProps> = ({
    onNavigateToMain, onNavigateToAdmin, isLoggedIn, onLogout, onOpenSubscriptionModal, products,
    theme, onThemeChange, fontSize, onFontSizeChange
}) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader 
                onNavigateToMain={onNavigateToMain} 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                onOpenSubscriptionModal={onOpenSubscriptionModal}
                theme={theme}
                onThemeChange={onThemeChange}
                fontSize={fontSize}
                onFontSizeChange={onFontSizeChange}
            />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-brand-primary">Nossa Vitrine Cultural</h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore nossos cursos, produtos digitais e serviços criados para aprofundar sua conexão com a cultura brasileira.
                        </p>
                        <button 
                            onClick={onNavigateToMain}
                            className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Voltar ao Início
                        </button>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center bg-white p-10 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700">Nenhum produto ou serviço disponível.</h3>
                            <p className="text-gray-500 mt-2">Nossa vitrine está sendo preparada. Volte em breve para conferir as novidades!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />

            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOpenSubscriptionModal={onOpenSubscriptionModal} />}
        </div>
    );
};

export default ProductsAndServicesPage;