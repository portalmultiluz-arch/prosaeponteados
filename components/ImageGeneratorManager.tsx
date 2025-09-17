import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { DownloadIcon, TrashIcon, PlusIcon } from './icons';
import type { GeneratedImage } from '../types';

interface ManagerProps {
    onBack: () => void;
    items: GeneratedImage[];
    onItemsChange: (newItems: GeneratedImage[]) => void;
}

const aspectRatios = [
    { label: 'Quadrado (1:1)', value: '1:1' },
    { label: 'Retrato (3:4)', value: '3:4' },
    { label: 'Paisagem (4:3)', value: '4:3' },
    { label: 'Story (9:16)', value: '9:16' },
    { label: 'Cinema (16:9)', value: '16:9' },
];

const ImageGeneratorManager: React.FC<ManagerProps> = ({ onBack, items, onItemsChange }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0].value);
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) {
            setError('Por favor, descreva a imagem que você deseja criar.');
            return;
        }
        setLoading(true);
        setGeneratedImage(null);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: `Foco em cultura brasileira. ${prompt}`,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: selectedRatio as any,
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
                setGeneratedImage(imageUrl);
            } else {
                setError('Não foi possível gerar a imagem. Tente um prompt diferente.');
            }
        } catch (err) {
            console.error(err);
            setError('Sua solicitação foi bloqueada. Verifique se o prompt não viola as políticas de segurança e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveImage = () => {
        if (generatedImage) {
            const newImage: GeneratedImage = {
                id: String(Date.now()),
                prompt,
                imageUrl: generatedImage,
                createdAt: new Date().toISOString(),
            };
            onItemsChange([newImage, ...items]);
            setGeneratedImage(null);
            setPrompt('');
            alert('Imagem salva na galeria pública!');
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta imagem da galeria?')) {
            onItemsChange(items.filter(item => item.id !== id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Gerador de Imagens (Admin)</h2>
                <p className="text-sm text-gray-500">Crie imagens para a galeria pública da plataforma.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-slate-50">
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Descrição da Imagem (Prompt)</label>
                    <textarea id="prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ex: Um violeiro tocando ao pôr do sol no sertão, em estilo de pintura a óleo." className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg" disabled={loading} />
                </div>
                <div>
                    <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700 mb-1">Formato da Imagem</label>
                    <select id="aspectRatio" value={selectedRatio} onChange={(e) => setSelectedRatio(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white" disabled={loading}>
                        {aspectRatios.map(ratio => <option key={ratio.value} value={ratio.value}>{ratio.label}</option>)}
                    </select>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center">
                        {loading ? 'Gerando Imagem...' : 'Gerar Imagem'}
                    </button>
                </div>
            </form>

            {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

            {generatedImage && (
                <div className="border-t pt-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pré-visualização:</h3>
                    <img src={generatedImage} alt={prompt} className="max-w-md mx-auto rounded-lg shadow-lg" />
                    <button onClick={handleSaveImage} className="mt-6 inline-flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors">
                        <PlusIcon className="h-5 w-5"/>
                        Salvar na Galeria
                    </button>
                </div>
            )}

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-t pt-6">Galeria de Imagens Salvas</h3>
                {items.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map(item => (
                            <div key={item.id} className="relative group">
                                <img src={item.imageUrl} alt={item.prompt} className="w-full h-40 object-cover rounded-md" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">Nenhuma imagem na galeria. Gere e salve uma imagem para começar.</p>
                )}
            </div>
        </div>
    );
};

export default ImageGeneratorManager;
