import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import AITools from './AITools';
import type { SheetMusic, AIToolContent } from '../types';

interface AIToolsPageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    sheetMusic: SheetMusic[];
    aiToolsContent: AIToolContent[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const AIToolsPage: React.FC<AIToolsPageProps> = ({ 
    onNavigateToMain, onNavigateToAdmin, isLoggedIn, onLogout, 
    onOpenSubscriptionModal, sheetMusic, aiToolsContent,
    theme, onThemeChange, fontSize, onFontSizeChange
}) => {
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
            <main className="flex-grow">
                <AITools 
                    onNavigateToMain={onNavigateToMain} 
                    onOpenSubscriptionModal={onOpenSubscriptionModal} 
                    sheetMusic={sheetMusic} 
                    aiToolsContent={aiToolsContent}
                />
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
};

export default AIToolsPage;