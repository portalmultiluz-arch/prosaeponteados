import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { CulturalKnowledgeItem } from '../types';

interface CulturalKnowledgeManagerProps {
  onBack: () => void;
  items: CulturalKnowledgeItem[];
  onItemsChange: (newItems: CulturalKnowledgeItem[]) => void;
}

const itemTypes: CulturalKnowledgeItem['type'][] = ['Artigo', 'Vídeo', 'Material'];

const CulturalKnowledgeManager: React.FC<CulturalKnowledgeManagerProps> = ({ onBack, items, onItemsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CulturalKnowledgeItem | null>(null);
  const [formState, setFormState] = useState<Omit<CulturalKnowledgeItem, 'id'>>({
    title: '', type: 'Artigo', tagline: '', description: '', imageUrl: '', videoUrl: ''
  });

  const openModal = (item: CulturalKnowledgeItem | null = null) => {
    setCurrentItem(item);
    setFormState(item ? { ...item } : { title: '', type: 'Artigo', tagline: '', description: '', imageUrl: '', videoUrl: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      // Edit
      onItemsChange(items.map(p => (p.id === currentItem.id ? { ...currentItem, ...formState } : p)));
    } else {
      // Add
      onItemsChange([...items, { id: String(Date.now()), ...formState }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      onItemsChange(items.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar "Saber Cultural"</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Conteúdo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Título</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Tipo</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4 font-medium">{item.title}</td>
                <td className="text-left py-3 px-4">{item.type}</td>
                <td className="text-center py-3 px-4">
                  <button onClick={() => openModal(item)} className="p-2 text-gray-500 hover:text-blue-600" aria-label="Editar">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600" aria-label="Excluir">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={3} className="text-center py-4 text-gray-500">Nenhum conteúdo cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative animate-fade-in-scale max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Conteúdo</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
              <XIcon className="h-6 w-6" />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="title" id="title" value={formState.title} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
              </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                  <select name="type" id="type" value={formState.type} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                    {itemTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline (Chamada Curta)</label>
                <input type="text" name="tagline" id="tagline" value={formState.tagline} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Do zero ao avançado." required />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição / Conteúdo Completo</label>
                <textarea name="description" id="description" value={formState.description} onChange={handleFormChange} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                <input type="url" name="imageUrl" id="imageUrl" value={formState.imageUrl} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="https://..." required />
              </div>
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">URL do Vídeo (YouTube Embed - Opcional)</label>
                <input type="url" name="videoUrl" id="videoUrl" value={formState.videoUrl} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="https://www.youtube.com/embed/..." />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalKnowledgeManager;