import React, { useState } from 'react';
import CourseStructureGenerator from './CourseStructureGenerator';
import StudyPlanGenerator from './StudyPlanGenerator';
import VioleiroVirtual from './VioleiroVirtual';
import PreUpgradeModal from './PreUpgradeModal';
import { SparklesIcon, MusicIcon } from './icons';
import type { SubscriptionPlan, SheetMusic, AIToolContent } from '../types';

interface AIToolsProps {
    onNavigateToMain: () => void;
    onOpenSubscriptionModal: () => void;
    sheetMusic: SheetMusic[];
    aiToolsContent: AIToolContent[];
}

const AITools: React.FC<AIToolsProps> = ({ onNavigateToMain, onOpenSubscriptionModal, sheetMusic, aiToolsContent }) => {
    const [activeTool, setActiveTool] = useState<'violeiro' | 'course' | 'plan'>('violeiro');
    const [isPreUpgradeModalOpen, setIsPreUpgradeModalOpen] = useState(false);
    
    // In a real app, this would come from user context/state.
    const [currentUserPlan, setCurrentUserPlan] = useState<SubscriptionPlan>('free'); 

    const handleUpgradeRequired = () => {
        setIsPreUpgradeModalOpen(true);
    };

    const handleShowPlans = () => {
        setIsPreUpgradeModalOpen(false);
        onOpenSubscriptionModal();
    };

    const handleLoginSuccess = () => {
        setCurrentUserPlan('premium'); // Simulate successful login and upgrade plan
        setIsPreUpgradeModalOpen(false);
        alert('Login bem-sucedido! Seus recursos premium foram desbloqueados.');
    };

    const violeiroContent = aiToolsContent.find(c => c.id === 'violeiro-virtual');
    const courseContent = aiToolsContent.find(c => c.id === 'course-structure-generator');
    const planContent = aiToolsContent.find(c => c.id === 'study-plan-generator');

    return (
        <section id="ia-tools" className="py-16 md:py-20 bg-brand-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-brand-primary">Ferramentas com IA</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Utilize nossa Inteligência Artificial para acelerar seu aprendizado e criação de conteúdo cultural.
                    </p>
                    <button 
                        onClick={onNavigateToMain}
                        className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Voltar ao Início
                    </button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap justify-center border-b border-gray-200 mb-8">
                        <button
                            onClick={() => setActiveTool('violeiro')}
                            className={`flex items-center gap-2 px-4 py-3 text-md font-medium transition-colors duration-200 ${activeTool === 'violeiro' ? 'border-b-2 border-brand-secondary text-brand-primary' : 'text-gray-500 hover:text-brand-primary'}`}
                            aria-pressed={activeTool === 'violeiro'}
                        >
                            <MusicIcon className="h-5 w-5" />
                            {violeiroContent?.title || 'Violeiro Virtual'}
                        </button>
                        <button
                            onClick={() => setActiveTool('course')}
                            className={`flex items-center gap-2 px-4 py-3 text-md font-medium transition-colors duration-200 ${activeTool === 'course' ? 'border-b-2 border-brand-secondary text-brand-primary' : 'text-gray-500 hover:text-brand-primary'}`}
                            aria-pressed={activeTool === 'course'}
                        >
                            <SparklesIcon className="h-5 w-5" />
                             {courseContent?.title || 'Estrutura de Curso'}
                        </button>
                        <button
                            onClick={() => setActiveTool('plan')}
                            className={`flex items-center gap-2 px-4 py-3 text-md font-medium transition-colors duration-200 ${activeTool === 'plan' ? 'border-b-2 border-brand-secondary text-brand-primary' : 'text-gray-500 hover:text-brand-primary'}`}
                            aria-pressed={activeTool === 'plan'}
                        >
                            <SparklesIcon className="h-5 w-5" />
                            {planContent?.title || 'Plano de Estudo'}
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
                        {activeTool === 'violeiro' && violeiroContent && <VioleiroVirtual sheetMusic={sheetMusic} content={violeiroContent} />}
                        {activeTool === 'course' && courseContent && <CourseStructureGenerator currentUserPlan={currentUserPlan} onUpgradeRequired={handleUpgradeRequired} content={courseContent} />}
                        {activeTool === 'plan' && planContent && <StudyPlanGenerator currentUserPlan={currentUserPlan} onUpgradeRequired={handleUpgradeRequired} content={planContent} />}
                    </div>
                </div>
            </div>
            <PreUpgradeModal 
                isOpen={isPreUpgradeModalOpen}
                onClose={() => setIsPreUpgradeModalOpen(false)}
                onShowPlans={handleShowPlans}
                onLoginSuccess={handleLoginSuccess}
            />
        </section>
    );
};

export default AITools;