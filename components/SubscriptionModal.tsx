import React from 'react';
import { XIcon, CheckIcon } from './icons';
import type { Plan } from '../types';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    plans: Plan[];
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, plans }) => {
    if (!isOpen) return null;

    const handleBackToTop = () => {
        onClose();
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscription-modal-title"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-auto flex flex-col max-h-[90vh] overflow-hidden transform animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header (fixed) */}
                <div className="flex-shrink-0 p-6 md:pb-4 text-center relative border-b border-gray-200">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar modal">
                        <XIcon className="h-6 w-6" />
                    </button>
                    <h2 id="subscription-modal-title" className="text-3xl font-serif text-brand-primary">Desbloqueie Todo o Potencial</h2>
                    <p className="mt-2 text-gray-600">Escolha o plano ideal para sua jornada cultural.</p>
                </div>
                
                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`rounded-lg p-6 flex flex-col border ${plan.popular ? 'border-brand-accent scale-105 shadow-xl' : 'border-gray-200 bg-white'}`}>
                                <div className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${plan.color} ${plan.textColor} self-start`}>{plan.name}</div>
                                <p className="text-3xl font-bold text-brand-primary my-4">{plan.price}</p>
                                <ul className="space-y-3 mb-6 text-gray-600 flex-grow">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start">
                                            <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-1" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-auto bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors duration-300">
                                    Escolher Plano
                                </button>
                            </div>
                        ))}
                        {plans.length === 0 && <p className="text-center text-gray-500 col-span-full py-8">Nenhum plano de assinatura disponível no momento.</p>}
                    </div>
                </div>

                {/* Modal Footer (fixed) */}
                <div className="flex-shrink-0 mt-auto p-4 bg-slate-50 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button 
                        onClick={onClose}
                        className="font-medium bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Sair
                    </button>
                    <button 
                        onClick={handleBackToTop}
                        className="font-medium bg-brand-secondary text-white py-2 px-6 rounded-md hover:bg-brand-primary transition-colors"
                    >
                        Voltar ao Início
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;