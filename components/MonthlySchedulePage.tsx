import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { ScheduleEvent } from '../types';
import { CalendarIcon, VideoCameraIcon, CourseIcon, PartnershipIcon, ArrowLeftIcon } from './icons';

interface SchedulePageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    events: ScheduleEvent[];
    onOpenSubscriptionModal: () => void;
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const typeDetails: Record<ScheduleEvent['type'], { icon: React.FC<{className?: string}>, color: string }> = {
    'Live': { icon: VideoCameraIcon, color: 'bg-red-100 text-red-800' },
    'Evento': { icon: CalendarIcon, color: 'bg-blue-100 text-blue-800' },
    'Videoaula': { icon: CourseIcon, color: 'bg-green-100 text-green-800' },
    'Parceiro': { icon: PartnershipIcon, color: 'bg-yellow-100 text-yellow-800' },
};

const EventCard: React.FC<{ event: ScheduleEvent }> = ({ event }) => {
    const eventDate = new Date(event.date + 'T' + event.time);
    const day = eventDate.toLocaleDateString('pt-BR', { day: '2-digit' });
    const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const weekday = eventDate.toLocaleDateString('pt-BR', { weekday: 'long' });

    const { icon: Icon, color } = typeDetails[event.type];

    return (
        <div className="flex items-start space-x-4 p-5 bg-white rounded-lg shadow-md border-l-4 border-brand-secondary">
            <div className="flex-shrink-0 text-center bg-slate-50 p-3 rounded-md">
                <p className="text-brand-primary font-bold text-3xl">{day}</p>
                <p className="text-brand-secondary uppercase text-sm font-semibold">{month}</p>
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-brand-primary">{event.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">{weekday} às {event.time}</p>
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-bold px-2 py-1 rounded-full ${color}`}>
                        <Icon className="h-4 w-4" />
                        <span>{event.type}</span>
                    </div>
                </div>
                <p className="mt-2 text-gray-700">{event.description}</p>
            </div>
        </div>
    );
};

const MonthlySchedulePage: React.FC<SchedulePageProps> = ({ 
    onNavigateToMain, onNavigateToAdmin, isLoggedIn, onLogout, events,
    onOpenSubscriptionModal, theme, onThemeChange, fontSize, onFontSizeChange
}) => {
    const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-brand-primary">Nossa Programação Mensal</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Fique por dentro de todas as nossas lives, eventos, videoaulas e atividades de parceiros.
                        </p>
                         <button 
                            onClick={onNavigateToMain}
                            className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Voltar ao Início
                        </button>
                    </div>

                    <div className="space-y-8">
                        {sortedEvents.length > 0 ? (
                            sortedEvents.map(event => <EventCard key={event.id} event={event} />)
                        ) : (
                            <div className="text-center bg-white p-10 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-700">Nenhum evento programado.</h3>
                                <p className="text-gray-500 mt-2">Por favor, volte em breve para conferir as novidades!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
};

export default MonthlySchedulePage;