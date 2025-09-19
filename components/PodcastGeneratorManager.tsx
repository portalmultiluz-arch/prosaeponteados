import React, { useState, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { jsPDF } from 'jspdf';
import { DownloadIcon, PlayIcon, StopIcon, PlusIcon, TrashIcon } from './icons';
import type { GeneratedPodcast } from '../types';

interface ManagerProps {
    onBack: () => void;
    items: GeneratedPodcast[];
    onItemsChange: (newItems: GeneratedPodcast[]) => void;
}

const mediaOptions = [
    { value: 'youtube_video', label: 'Roteiro para Vídeo (YouTube)' },
    { value: 'podcast_dialogue', label: 'Diálogo para Podcast' },
    { value: 'tiktok_video', label: 'Roteiro para TikTok (Curto)' },
    { value: 'instagram_post', label: 'Post para Instagram' },
    { value: 'linkedin_post', label: 'Post para LinkedIn' },
    { value: 'pinterest_pin', label: 'Descrição para Pinterest Pin' },
    { value: 'ebook_chapter', label: 'Capítulo de E-book' },
    { value: 'descriptive_text', label: 'Texto Descritivo (Artigo)' },
    { value: 'quick_message', label: 'Mensagem Rápida (Social)' },
];

const contentLevels = ['Elementar', 'Básico', 'Intermediário', 'Avançado', 'Histórico', 'Acadêmico/Científico'];
const voiceOptions = ['Masculino/Feminino', 'Feminino/Feminino', 'Masculino/Masculino'];

const PodcastGeneratorManager: React.FC<ManagerProps> = ({ onBack, items, onItemsChange }) => {
    const [topic, setTopic] = useState('');
    const [mediaType, setMediaType] = useState(mediaOptions[0].value);
    const [level, setLevel] = useState(contentLevels[1]); // Default to Básico
    const [voices, setVoices] = useState(voiceOptions[0]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => { if (window.speechSynthesis.speaking) window.speechSynthesis.cancel(); };
    }, []);
    
    const getPrompt = () => {
        const mediaLabel = mediaOptions.find(m => m.value === mediaType)?.label || '';
        let formatInstructions = '';
        switch(mediaType) {
            case 'tiktok_video':
                formatInstructions = 'Crie um roteiro curto, dinâmico e com forte apelo visual, ideal para vídeos de até 1 minuto. Use uma linguagem informal.';
                break;
            case 'ebook_chapter':
                formatInstructions = 'Desenvolva um capítulo detalhado e bem estruturado, com parágrafos claros, subtítulos e profundidade no conteúdo. A linguagem deve ser formal e informativa.';
                break;
            case 'linkedin_post':
                formatInstructions = 'Crie um post profissional, com parágrafos curtos, insights relevantes e talvez uma pergunta para engajar a audiência. Use hashtags apropriadas.';
                break;
            case 'quick_message':
                formatInstructions = 'Gere uma mensagem curta e impactante, ideal para status de WhatsApp ou um tweet, resumindo a essência do tópico.';
                break;
            default:
                formatInstructions = 'O roteiro deve ser claro, bem estruturado e adequado para a mídia selecionada.';
        }

        return `Você é um especialista em criação de conteúdo sobre cultura brasileira. Sua tarefa é gerar um roteiro de conteúdo com base nas especificações abaixo.

        1.  **Tópico Central:** "${topic}"
        2.  **Mídia de Destino:** ${mediaLabel}
        3.  **Nível de Profundidade:** ${level}
        4.  **Formato do Diálogo (se aplicável):** Diálogo entre duas vozes (${voices}).
        
        **Instruções Adicionais:**
        - ${formatInstructions}
        - Se for um diálogo, identifique claramente cada voz (ex: "Voz 1 (Masculina):", "Voz 2 (Feminina):").
        - O foco principal deve ser a cultura brasileira (música, arte, folclore, culinária, etc.).
        - A resposta deve ser em português do Brasil e formatada em Markdown, pronta para ser lida ou gravada.`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) {
            setError('Por favor, insira um tópico para o conteúdo.');
            return;
        }
        setLoading(true);
        setResult('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = getPrompt();
            const response: GenerateContentResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setResult(response.text);
        } catch (err) {
            console.error(err);
            setError('Sua solicitação foi bloqueada por violar nossas políticas de segurança. Por favor, ajuste o tópico e tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAudio = (script: string) => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(script.replace(/(\*\*|__|\*|_|#)/g, ''));
            utterance.lang = 'pt-BR';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleDownloadPdf = (title: string, script: string) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(title, 10, 20);
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(script.replace(/(\*\*|__|\*|_|#)/g, ''), 180);
        doc.text(splitText, 10, 30);
        doc.save(`${title.substring(0,20).replace(/\s/g, '_')}_roteiro.pdf`);
    };

    const handleSaveScript = () => {
        if (result) {
            const newPodcast: GeneratedPodcast = {
                id: String(Date.now()),
                topic,
                script: result,
                createdAt: new Date().toISOString(),
            };
            onItemsChange([newPodcast, ...items]);
            setResult('');
            setTopic('');
            alert('Roteiro salvo na galeria pública!');
        }
    };
    
    const handleDelete = (id: string) => {
         if (window.confirm('Tem certeza que deseja excluir este roteiro da galeria?')) {
            onItemsChange(items.filter(item => item.id !== id));
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Gerador de Podcast e Conteúdo (Admin)</h2>
                <p className="text-sm text-gray-500">Crie roteiros para a galeria pública da plataforma.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-slate-50">
                <div>
                    <label htmlFor="podcast-topic" className="block text-sm font-medium text-gray-700">Tópico Principal</label>
                    <input id="podcast-topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ex: A origem do Frevo" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" disabled={loading} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">Mídia</label>
                        <select id="mediaType" value={mediaType} onChange={(e) => setMediaType(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white" disabled={loading}>
                            {mediaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Nível</label>
                        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white" disabled={loading}>
                            {contentLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="voices" className="block text-sm font-medium text-gray-700">Diálogo</label>
                        <select id="voices" value={voices} onChange={(e) => setVoices(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white" disabled={loading}>
                            {voiceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center">
                        {loading ? 'Gerando Conteúdo...' : 'Gerar Conteúdo'}
                    </button>
                </div>
            </form>

            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

            {result && (
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Roteiro Gerado:</h3>
                    <div className="prose max-w-none text-gray-800 bg-slate-50 p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>').replace(/(\*|_)(.*?)\1/g, '<em>$2</em>').replace(/### (.*)/g, '<h4 class="text-lg font-semibold mt-4 text-brand-primary">$1</h4>').replace(/## (.*)/g, '<h3 class="text-xl font-bold mt-6 mb-2 text-brand-primary">$1</h3>').replace(/# (.*)/g, '<h2 class="text-2xl font-serif mt-8 mb-4 text-brand-primary">$1</h2>') }} />
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <button onClick={() => handleAudio(result)} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">
                            {isSpeaking ? <><StopIcon className="h-5 w-5" /> Parar Áudio</> : <><PlayIcon className="h-5 w-5" /> Ouvir Áudio</>}
                        </button>
                        <button onClick={() => handleDownloadPdf(topic, result)} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
                            <DownloadIcon className="h-5 w-5" /> Download PDF
                        </button>
                        <button onClick={handleSaveScript} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                           <PlusIcon className="h-5 w-5" /> Salvar na Galeria
                        </button>
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-t pt-6">Galeria de Roteiros Salvos</h3>
                {items.length > 0 ? (
                    <div className="space-y-3">
                        {items.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.topic}</p>
                                    <p className="text-xs text-gray-500">Criado em {new Date(item.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">Nenhum roteiro na galeria. Gere e salve um roteiro para começar.</p>
                )}
            </div>
        </div>
    );
};

export default PodcastGeneratorManager;