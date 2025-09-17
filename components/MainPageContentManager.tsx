import React, { useState } from 'react';
import type { MainPageContent, Testimonial } from '../types';
import { PlusIcon, TrashIcon, ArrowLeftIcon } from './icons';

interface MainPageContentManagerProps {
  onBack: () => void;
  content: MainPageContent;
  onContentChange: (newContent: MainPageContent) => void;
}

const MainPageContentManager: React.FC<MainPageContentManagerProps> = ({ onBack, content, onContentChange }) => {
    const [formData, setFormData] = useState(content);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTestimonialChange = (id: string, field: 'text' | 'author', value: string) => {
        setFormData(prev => ({
            ...prev,
            testimonials: prev.testimonials.map(t =>
                t.id === id ? { ...t, [field]: value } : t
            )
        }));
    };

    const addTestimonial = () => {
        const newTestimonial: Testimonial = {
            id: String(Date.now()),
            text: '',
            author: ''
        };
        setFormData(prev => ({
            ...prev,
            testimonials: [...prev.testimonials, newTestimonial]
        }));
    };

    const removeTestimonial = (id: string) => {
        if (window.confirm('Tem certeza que deseja remover este depoimento?')) {
            setFormData(prev => ({
                ...prev,
                testimonials: prev.testimonials.filter(t => t.id !== id)
            }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onContentChange(formData);
        alert('Conteúdo da página principal salvo com sucesso!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Gerenciar Conteúdo da Página Principal</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-8">
                {/* Section for Cover and About Us */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold text-gray-800 px-2">Seção Superior (Capa e "Quem Somos")</legend>
                    <div className="space-y-4 pt-2">
                        <div>
                            <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem de Capa</label>
                            <input type="url" name="coverImageUrl" id="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="aboutUsImageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem 'Quem Somos'</label>
                            <input type="url" name="aboutUsImageUrl" id="aboutUsImageUrl" value={formData.aboutUsImageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="aboutUsText1" className="block text-sm font-medium text-gray-700">Texto 'Quem Somos' (Parágrafo 1)</label>
                            <textarea name="aboutUsText1" id="aboutUsText1" value={formData.aboutUsText1} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="aboutUsText2" className="block text-sm font-medium text-gray-700">Texto 'Quem Somos' (Parágrafo 2)</label>
                            <textarea name="aboutUsText2" id="aboutUsText2" value={formData.aboutUsText2} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></textarea>
                        </div>
                    </div>
                </fieldset>

                 {/* Section for Daily Message */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold text-gray-800 px-2">Mensagem do Dia</legend>
                    <div className="space-y-4 pt-2">
                        <div>
                            <label htmlFor="dailyMessageText" className="block text-sm font-medium text-gray-700">Texto da Mensagem</label>
                            <input type="text" name="dailyMessageText" id="dailyMessageText" value={formData.dailyMessageText} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="dailyMessageAuthor" className="block text-sm font-medium text-gray-700">Autor da Mensagem</label>
                            <input type="text" name="dailyMessageAuthor" id="dailyMessageAuthor" value={formData.dailyMessageAuthor} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                    </div>
                </fieldset>

                {/* Section for Testimonials */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold text-gray-800 px-2">Depoimentos</legend>
                     <div className="flex justify-end mb-4">
                        <button type="button" onClick={addTestimonial} className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm font-medium">
                            <PlusIcon className="h-4 w-4" /> Adicionar
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.testimonials.map((testimonial, index) => (
                            <div key={testimonial.id} className="p-4 border bg-slate-50 rounded-md space-y-3 relative">
                                <button type="button" onClick={() => removeTestimonial(testimonial.id)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 rounded-full bg-white" aria-label="Remover depoimento">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                                <div>
                                    <label htmlFor={`testimonial-text-${testimonial.id}`} className="block text-sm font-medium text-gray-700">Texto do Depoimento {index + 1}</label>
                                    <textarea id={`testimonial-text-${testimonial.id}`} value={testimonial.text} onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor={`testimonial-author-${testimonial.id}`} className="block text-sm font-medium text-gray-700">Autor</label>
                                    <input type="text" id={`testimonial-author-${testimonial.id}`} value={testimonial.author} onChange={(e) => handleTestimonialChange(testimonial.id, 'author', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                                </div>
                            </div>
                        ))}
                        {formData.testimonials.length === 0 && <p className="text-center text-gray-500 py-4">Nenhum depoimento adicionado.</p>}
                    </div>
                </fieldset>

                {/* Section for Contact */}
                <fieldset className="border p-4 rounded-md">
                    <legend className="text-lg font-semibold text-gray-800 px-2">Contato (Fale Conosco)</legend>
                    <div className="pt-2">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Email de Contato</label>
                        <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                </fieldset>

                <div className="flex justify-end gap-4 mt-8">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MainPageContentManager;