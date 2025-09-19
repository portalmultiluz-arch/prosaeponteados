import React, { useState, useRef, useEffect } from 'react';
// FIX: Removed HarmCategory and HarmBlockThreshold as they are part of a deprecated API.
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import type { SubscriptionPlan, AIToolContent } from '../types';
import { TrashIcon, ArrowUpIcon, DownloadIcon, PlayIcon, StopIcon } from './icons';
import PrintableView from './PrintableView';

interface GeneratorProps {
    currentUserPlan: SubscriptionPlan;
    onUpgradeRequired: () => void;
    content: AIToolContent;
}

const StudyPlanGenerator: React.FC<GeneratorProps> = ({ currentUserPlan, onUpgradeRequired, content }) => {
    const [subject, setSubject] = useState('');
    const [level, setLevel] = useState('Básico');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysPerWeek, setDaysPerWeek] = useState(3);
    const [hoursPerWeek, setHoursPerWeek] = useState(5);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showPrintView, setShowPrintView] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleNewContent = () => {
        setSubject('');
        setLevel('Básico');
        setStartDate('');
        setEndDate('');
        setDaysPerWeek(3);
        setHoursPerWeek(5);
        setResult('');
        setError('');
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleDownload = () => {
        if (currentUserPlan === 'free') {
            onUpgradeRequired();
            return;
        }
        setShowPrintView(true);
    };

    const handleAudio = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(result.replace(/#/g, '').replace(/\*/g, ''));
            utterance.lang = 'pt-BR';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleBackToTop = () => {
        componentRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !startDate || !endDate) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        setLoading(true);
        setResult('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Crie um plano de estudo personalizado. 
            Assunto: "${subject}". 
            Nível: "${level}". 
            Período de estudo: de ${startDate} a ${endDate}. 
            Disponibilidade: ${daysPerWeek} dias por semana, com um total de ${hoursPerWeek} horas de estudo semanais. 
            O plano deve ser detalhado, dividindo o conteúdo em semanas e dias, com metas realistas e sugestões de atividades. O foco é em cultura brasileira: viola caipira, causos e viola, poesia, música, teatro, cinema, dança, culinária. 
            A resposta deve ser em português do Brasil e formatada em Markdown.`;
            
            // FIX: Removed `safetySettings` from the generateContent call as it's not a valid parameter.
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setResult(response.text);
        } catch (err) {
            console.error(err);
            setError('Sua solicitação não pôde ser processada pois viola nossas políticas de segurança de conteúdo. Por favor, ajuste os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (showPrintView) {
        return (
            <PrintableView 
                title={`Plano de Estudo: ${subject}`}
                content={result}
                onClose={() => setShowPrintView(false)}
            />
        );
    }

    return (
        <div ref={componentRef}>
            <h3 className="text-2xl font-serif text-brand-primary text-center">{content.title}</h3>
            <p className="mt-2 text-center text-gray-600 mb-6">
                {content.description}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                    <legend className="text-lg font-semibold text-gray-800 mb-2">1. Defina seu Objetivo</legend>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Matéria/Assunto de Estudo</label>
                            <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Ex: Culinária Afro-Brasileira" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível</label>
                                <select id="level" value={level} onChange={e => setLevel(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm">
                                    <option>Básico</option>
                                    <option>Intermediário</option>
                                    <option>Avançado</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Data de Início</label>
                                <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm" required />
                            </div>
                            <div>
                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Data de Fim</label>
                                <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm" required />
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend className="text-lg font-semibold text-gray-800 mb-2">2. Defina sua Rotina</legend>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="days-per-week" className="block text-sm font-medium text-gray-700">Dias por Semana: <span className="font-bold text-brand-secondary">{daysPerWeek}</span></label>
                            <input type="range" id="days-per-week" min="1" max="7" value={daysPerWeek} onChange={e => setDaysPerWeek(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary" />
                        </div>
                        <div>
                            <label htmlFor="hours-per-week" className="block text-sm font-medium text-gray-700">Horas de Estudo por Semana: <span className="font-bold text-brand-secondary">{hoursPerWeek}</span></label>
                            <input type="range" id="hours-per-week" min="1" max="40" value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-secondary" />
                        </div>
                    </div>
                </fieldset>

                <div>
                    <button type="submit" disabled={loading} className="w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-primary transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center">
                         {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        {loading ? 'Gerando...' : 'Gerar Plano de Estudo'}
                    </button>
                </div>
            </form>
            
            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

            {result && (
                <div className="mt-8 border-t pt-6">
                    <div className="flex flex-wrap gap-2 justify-center mb-6 p-2 rounded-lg bg-slate-50">
                        <button onClick={handleNewContent} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary bg-white border border-gray-300 px-3 py-2 rounded-md transition-colors"><TrashIcon className="h-4 w-4" /> Gerar Novo</button>
                        <button onClick={handleBackToTop} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary bg-white border border-gray-300 px-3 py-2 rounded-md transition-colors"><ArrowUpIcon className="h-4 w-4" /> Voltar ao Início</button>
                        <button onClick={handleDownload} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary bg-white border border-gray-300 px-3 py-2 rounded-md transition-colors"><DownloadIcon className="h-4 w-4" /> Download PDF</button>
                        <button onClick={handleAudio} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary bg-white border border-gray-300 px-3 py-2 rounded-md transition-colors">
                            {isSpeaking ? <><StopIcon className="h-4 w-4" /> Parar Áudio</> : <><PlayIcon className="h-4 w-4" /> Ouvir Áudio</>}
                        </button>
                    </div>
                    <h4 className="text-2xl font-serif text-brand-primary mb-4">Seu Plano de Estudo:</h4>
                    <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>').replace(/(\*|_)(.*?)\1/g, '<em>$2</em>').replace(/### (.*)/g, '<h4 class="text-lg font-semibold mt-4 text-brand-primary">$1</h4>').replace(/## (.*)/g, '<h3 class="text-xl font-bold mt-6 mb-2 text-brand-primary">$1</h3>').replace(/# (.*)/g, '<h2 class="text-2xl font-serif mt-8 mb-4 text-brand-primary">$1</h2>') }}></div>
                </div>
            )}
        </div>
    );
};

export default StudyPlanGenerator;