import React, { useState } from 'react';
import { XIcon } from './icons';

interface PreUpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onShowPlans: () => void;
    onLoginSuccess: () => void;
    title?: string;
    message?: string;
    yesButtonText?: string;
    noButtonText?: string;
}

const PreUpgradeModal: React.FC<PreUpgradeModalProps> = ({ 
    isOpen, 
    onClose, 
    onShowPlans, 
    onLoginSuccess,
    title = "Acesso a Recurso Premium",
    message = "Este é um recurso exclusivo para assinantes. Você já faz parte do nosso clube?",
    yesButtonText = "Sim, já sou assinante",
    noButtonText = "Não, quero conhecer os planos"
}) => {
    const [view, setView] = useState<'initial' | 'login'>('initial');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle real authentication here.
        // For this demo, we'll just call the success callback.
        if (email && password) {
            console.log('Login attempt with:', { email, password });
            onLoginSuccess();
        } else {
            alert('Por favor, preencha o email e a senha.');
        }
    };
    
    const handleClose = () => {
        setView('initial'); // Reset view on close
        setEmail('');
        setPassword('');
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pre-upgrade-modal-title"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-auto p-8 relative transform animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar modal">
                    <XIcon className="h-6 w-6" />
                </button>
                
                {view === 'initial' && (
                    <div className="text-center">
                        <h2 id="pre-upgrade-modal-title" className="text-2xl font-serif text-brand-primary">{title}</h2>
                        <p className="mt-4 text-gray-600">{message}</p>
                        <div className="mt-8 space-y-4">
                            <button 
                                onClick={() => setView('login')}
                                className="w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors duration-300"
                            >
                                {yesButtonText}
                            </button>
                            <button 
                                onClick={onShowPlans}
                                className="w-full bg-transparent border border-brand-secondary text-brand-secondary font-bold py-3 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300"
                            >
                                {noButtonText}
                            </button>
                        </div>
                    </div>
                )}

                {view === 'login' && (
                    <div>
                        <div className="text-center mb-6">
                            <h2 id="pre-upgrade-modal-title" className="text-2xl font-serif text-brand-primary">Acesso de Assinante</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Faça login para continuar.
                            </p>
                        </div>
                        <form className="space-y-4" onSubmit={handleLoginSubmit}>
                             <div>
                                <label htmlFor="login-email" className="sr-only">Email</label>
                                <input id="login-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label htmlFor="login-password"  className="sr-only">Senha</label>
                                <input id="login-password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                                    placeholder="Senha"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent font-bold rounded-md text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                        <div className="text-sm text-center mt-4">
                            <a href="#" onClick={(e) => { e.preventDefault(); setView('initial'); }} className="font-medium text-brand-secondary hover:text-brand-primary">
                                &larr; Voltar
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreUpgradeModal;