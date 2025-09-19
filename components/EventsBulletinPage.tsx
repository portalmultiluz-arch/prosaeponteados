import React, { useState, useEffect, useMemo } from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import PrintableView from './PrintableView';
import PreUpgradeModal from './PreUpgradeModal';
import type { BulletinEvent, SubscriptionPlan } from '../types';
import { DownloadIcon } from './icons';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

interface PageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    events: BulletinEvent[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const categories = [
    { value: 'viola_caipira', label: 'Viola Caipira' },
    { value: 'musica', label: 'Música' },
    { value: 'culinaria', label: 'Culinária e Gastronomia' },
    { value: 'folclore', label: 'Festas Folclóricas' },
    { value: 'teatro_danca', label: 'Teatro e Dança' },
    { value: 'cinema_filmes', label: 'Cinema e Filmes' },
    { value: 'circo', label: 'Circo' },
];

const getPromptForCategory = (category: string) => {
    let themeDescription = '';
    switch (category) {
        case 'viola_caipira':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos relacionados à **viola caipira**. Isso inclui festivais, encontros de violeiros, shows, workshops, e rodas de viola. Se não encontrar eventos suficientes, pode complementar com eventos de música sertaneja de raiz onde a viola é protagonista. NÃO inclua eventos de outros temas culturais.';
            break;
        case 'musica':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos de **música**. Isso inclui shows, festivais de música de diversos gêneros (MPB, Rock, Samba, etc.), e apresentações. Exclua eventos que sejam primariamente sobre viola caipira, a menos que seja um festival amplo. NÃO inclua eventos de outros temas.';
            break;
        case 'culinaria':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos de **culinária e gastronomia**. Isso inclui festivais gastronômicos, feiras de produtores, festas de comidas típicas e workshops. NÃO inclua eventos de outros temas.';
            break;
        case 'folclore':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a **festas folclóricas e tradicionais**. Isso inclui Congadas, Folias de Reis, Festas do Divino, Maracatu, Bumba Meu Boi, etc. NÃO inclua eventos de outros temas.';
            break;
        case 'teatro_danca':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos de **teatro e dança**. Isso inclui festivais de teatro, mostras de dança, apresentações de balé, peças e espetáculos. NÃO inclua eventos de outros temas.';
            break;
        case 'cinema_filmes':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos de **cinema e filmes**. Isso inclui festivais de cinema, mostras de filmes, pré-estreias e eventos relacionados. NÃO inclua eventos de outros temas.';
            break;
        case 'circo':
            themeDescription = 'Sua busca deve ser restrita **EXCLUSIVAMENTE** a eventos de **circo**. Isso inclui espetáculos circenses, festivais de circo e apresentações de companhias de circo. NÃO inclua eventos de outros temas.';
            break;
        default:
            themeDescription = 'Sua busca deve focar em eventos culturais diversos pelo Brasil.';
    }

    return `
Você é um especialista em cultura brasileira.

Sua tarefa é gerar uma lista de eventos futuros no Brasil e retornar o resultado como um array JSON, seguindo estas regras estritas:

1.  **TEMA EXCLUSIVO:** ${themeDescription}

2.  **QUANTIDADE:** Sua resposta deve conter um array com pelo menos 5 e no máximo 10 eventos. Priorize a qualidade e a relevância sobre a quantidade.

3.  **PERÍODO:** Todos os eventos devem ter datas futuras, a partir de hoje.

4.  **FORMATO DE SAÍDA:** A resposta DEVE ser um array JSON válido e nada mais. Não inclua texto explicativo, comentários ou a palavra "json" antes ou depois do array. Cada objeto no array deve conter as chaves: "id" (string única), "title" (string), "date" (string no formato "YYYY-MM-DD"), "organizer" (string), "description" (string descritiva com no mínimo 20 palavras).

Exemplo de um item no JSON:
{
  "id": "1",
  "title": "Encontro Nacional de Violeiros de Poxoréu",
  "date": "2025-05-01",
  "organizer": "Prefeitura de Poxoréu",
  "description": "Tradicional encontro que reúne os maiores nomes da viola caipira do Brasil para apresentações e oficinas. Um evento imperdível para os amantes da música de raiz."
}

Agora, gere a lista de eventos.
`;
};


const parseLocalDate = (dateString: string): Date | null => {
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    return new Date(year, month - 1, day);
};

const EventCard: React.FC<{ event: BulletinEvent; onDownload: () => void }> = ({ event, onDownload }) => {
    const eventDate = parseLocalDate(event.date);

    if (!eventDate) {
        return <div className="bg-red-100 text-red-800 p-4 rounded-lg">Data do evento inválida.</div>;
    }

    const day = eventDate.toLocaleDateString('pt-BR', { day: '2-digit' });
    const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    const year = eventDate.getFullYear();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="flex-shrink-0 text-center bg-brand-secondary/10 p-6 md:w-40 flex flex-col justify-center items-center">
                <p className="text-brand-primary font-bold text-5xl">{day}</p>
                <p className="text-brand-secondary uppercase text-lg font-semibold">{month}</p>
                <p className="text-gray-500 text-sm mt-1">{year}</p>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif text-brand-primary">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Organizado por: {event.organizer}</p>
                <p className="text-gray-700 leading-relaxed my-4 flex-grow">{event.description}</p>
                <div className="mt-auto text-right">
                    <button 
                        onClick={onDownload}
                        className="inline-flex items-center gap-2 bg-brand-secondary text-white font-bold py-2 px-5 rounded-lg hover:bg-brand-primary transition-colors duration-300"
                    >
                        <DownloadIcon className="h-5 w-5"/>
                        Download do Relatório
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventsBulletinPage: React.FC<PageProps> = (props) => {
    const { onNavigateToMain, onNavigateToAdmin, onOpenSubscriptionModal } = props;
    const [showAll, setShowAll] = useState(false);
    const [printingEvent, setPrintingEvent] = useState<BulletinEvent | null>(null);
    const [fetchedEvents, setFetchedEvents] = useState<BulletinEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isPreUpgradeModalOpen, setIsPreUpgradeModalOpen] = useState(false);
    const [eventToDownload, setEventToDownload] = useState<BulletinEvent | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
    const [currentSearchCategory, setCurrentSearchCategory] = useState<string | null>(null);

    const currentUserPlan: SubscriptionPlan = props.isLoggedIn ? 'bronze' : 'free';
    
    const fetchDynamicEvents = async (category: string) => {
        setIsLoading(true);
        setApiError(null);
        setFetchedEvents([]);
        setCurrentSearchCategory(category);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = getPromptForCategory(category);
            
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            let eventsFromAI: BulletinEvent[] = [];
            const rawText = response.text;

            const jsonMatch = rawText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    const parsed = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(parsed)) {
                        eventsFromAI = parsed.filter(item => 
                            item.id && item.title && item.date && item.organizer && item.description
                        );
                    }
                } catch (parseError) {
                    console.error("Erro ao analisar a resposta JSON da IA:", parseError, "Resposta recebida:", rawText);
                    setApiError("A IA retornou uma resposta em um formato inesperado. A lista pode estar incompleta.");
                }
            } else {
                 console.error("Nenhum array JSON encontrado na resposta da IA:", rawText);
                 setApiError("A IA não retornou eventos no formato esperado.");
            }
            
            setFetchedEvents(eventsFromAI);

        } catch (e) {
            console.error("Erro ao buscar eventos dinâmicos:", e);
            setApiError("Não foi possível buscar novos eventos no momento. Tente novamente mais tarde.");
            setFetchedEvents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchDynamicEvents(selectedCategory);
    };

    const handleDownload = (event: BulletinEvent) => {
        if (currentUserPlan === 'free') {
            setEventToDownload(event);
            setIsPreUpgradeModalOpen(true);
        } else {
            setPrintingEvent(event);
        }
    };

    const handleLoginSuccess = () => {
        setIsPreUpgradeModalOpen(false);
        alert('Login bem-sucedido! Seu recurso de download foi desbloqueado.');
        if (eventToDownload) {
            setPrintingEvent(eventToDownload);
            setEventToDownload(null);
        }
    };
    
    const handleShowPlans = () => {
        setIsPreUpgradeModalOpen(false);
        onOpenSubscriptionModal();
    };

    const allEvents = useMemo(() => {
        const sourceEvents = currentSearchCategory ? fetchedEvents : props.events;
        const uniqueEventsMap = new Map<string, BulletinEvent>();
        sourceEvents.forEach(event => {
            const key = `${event.title.toLowerCase().trim()}-${event.date}`;
            if (!uniqueEventsMap.has(key)) {
                uniqueEventsMap.set(key, event);
            }
        });
        return Array.from(uniqueEventsMap.values());
    }, [props.events, fetchedEvents, currentSearchCategory]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = allEvents.filter(event => {
        const eventDate = parseLocalDate(event.date);
        return eventDate && eventDate >= today;
    });

    const sortedEvents = upcomingEvents.sort((a, b) => {
        const dateA = parseLocalDate(a.date)?.getTime() || 0;
        const dateB = parseLocalDate(b.date)?.getTime() || 0;
        return dateA - dateB;
    });

    const eventsToShow = showAll ? sortedEvents : sortedEvents.slice(0, 3);

    if (printingEvent) {
        return (
            <PrintableView
                title={printingEvent.title}
                content={printingEvent.description}
                onClose={() => setPrintingEvent(null)}
                disclaimer="O Evento aqui divulgado é de total responsabilidade do organizador, não tendo o Prosa e Ponteado qualquer responsabilidade sobre o mesmo."
            />
        );
    }
    
    const currentCategoryLabel = categories.find(c => c.value === currentSearchCategory)?.label.toLowerCase() || '';

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader {...props} />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif text-brand-primary">Boletim de Eventos Culturais</h1>
                        <p className="mt-4 text-lg text-gray-600">Explore a agenda dos principais eventos culturais no Brasil.</p>
                         <button 
                            onClick={onNavigateToMain}
                            className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Voltar ao Início
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md mb-12 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-full sm:flex-grow">
                            <label htmlFor="category-select" className="sr-only">Selecione uma categoria</label>
                            <select 
                                id="category-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"
                            >
                                {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                            </select>
                        </div>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-primary transition-colors duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </form>

                    <div className="space-y-8">
                        {isLoading ? (
                            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                                <p className="text-lg text-gray-600 animate-pulse">Buscando eventos sobre {categories.find(c=>c.value === selectedCategory)?.label.toLowerCase()}...</p>
                            </div>
                        ) : eventsToShow.length > 0 ? (
                            eventsToShow.map(event => <EventCard key={event.id} event={event} onDownload={() => handleDownload(event)} />)
                        ) : (
                            <div className="text-center bg-white p-10 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    {currentSearchCategory ? 'Nenhum evento futuro encontrado.' : 'Nenhum evento programado.'}
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    {currentSearchCategory 
                                        ? `Nossa busca não encontrou novos eventos sobre ${currentCategoryLabel}. Por favor, tente outra categoria ou volte em breve!`
                                        : "Por favor, selecione uma categoria e clique em 'Buscar' para ver os eventos."
                                    }
                                </p>
                            </div>
                        )}
                        {apiError && !isLoading && <p className="text-center text-yellow-800 bg-yellow-100 p-3 rounded-md mt-4">{apiError}</p>}
                    </div>

                    {sortedEvents.length > 3 && !showAll && !isLoading && (
                        <div className="text-center mt-12">
                            <button 
                                onClick={() => setShowAll(true)}
                                className="bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 ease-in-out text-lg shadow-lg"
                            >
                                Ver Mais Eventos
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
            <PreUpgradeModal
                isOpen={isPreUpgradeModalOpen}
                onClose={() => setIsPreUpgradeModalOpen(false)}
                onShowPlans={handleShowPlans}
                onLoginSuccess={handleLoginSuccess}
                title="Download de Relatório"
                message="O download do relatório completo do evento é um recurso exclusivo para assinantes. Já faz parte do nosso clube?"
                yesButtonText="Sim, sou assinante"
                noButtonText="Não, ver planos"
            />
        </div>
    );
};

export default EventsBulletinPage;