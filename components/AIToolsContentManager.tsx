import React, { useState } from 'react';
import type { AIToolContent } from '../types';

interface AIToolsContentManagerProps {
  onBack: () => void;
  items: AIToolContent[];
  onItemsChange: (newItems: AIToolContent[]) => void;
}

const AIToolsContentManager: React.FC<AIToolsContentManagerProps> = ({ onBack, items, onItemsChange }) => {
    const [formData, setFormData] = useState(items);

    const handleChange = (id: AIToolContent['id'], e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev.map(item => item.id === id ? { ...item, [name]: value } : item));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onItemsChange(formData);
        alert('Conteúdo das Ferramentas de IA salvo com sucesso!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Gerenciar Conteúdo das Ferramentas de IA</h2>
            <form onSubmit={handleSave} className="space-y-8">
                {formData.map((tool) => (
                    <fieldset key={tool.id} className="border p-4 rounded-md">
                        <legend className="text-lg font-semibold text-gray-800 px-2">{tool.title}</legend>
                        <div className="space-y-4 pt-2">
                            <div>
                                <label htmlFor={`title-${tool.id}`} className="block text-sm font-medium text-gray-700">Título do Card/Página</label>
                                <input type="text" name="title" id={`title-${tool.id}`} value={tool.title} onChange={(e) => handleChange(tool.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor={`description-${tool.id}`} className="block text-sm font-medium text-gray-700">Descrição</label>
                                <textarea name="description" id={`description-${tool.id}`} value={tool.description} onChange={(e) => handleChange(tool.id, e)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor={`imageUrl-${tool.id}`} className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                                <input type="url" name="imageUrl" id={`imageUrl-${tool.id}`} value={tool.imageUrl} onChange={(e) => handleChange(tool.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="https://" />
                            </div>
                            <div>
                                <label htmlFor={`videoUrl-${tool.id}`} className="block text-sm font-medium text-gray-700">URL do Vídeo (Tutorial)</label>
                                <input type="url" name="videoUrl" id={`videoUrl-${tool.id}`} value={tool.videoUrl} onChange={(e) => handleChange(tool.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="https://www.youtube.com/embed/..." />
                            </div>
                            <div>
                                <label htmlFor={`textUrl-${tool.id}`} className="block text-sm font-medium text-gray-700">URL do Texto (PDF)</label>
                                <input type="url" name="textUrl" id={`textUrl-${tool.id}`} value={tool.textUrl} onChange={(e) => handleChange(tool.id, e)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                        </div>
                    </fieldset>
                ))}
                <div className="flex justify-end gap-4 mt-8">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AIToolsContentManager;
