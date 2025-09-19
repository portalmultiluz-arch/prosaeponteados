import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { EffectiveRemedyItem } from '../types';

interface EffectiveRemedyManagerProps {
  onBack: () => void;
  items: EffectiveRemedyItem[];
  onItemsChange: (newItems: EffectiveRemedyItem[]) => void;
}

const EffectiveRemedyManager: React.FC<EffectiveRemedyManagerProps> = ({ onBack, items, onItemsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<EffectiveRemedyItem | null>(null);
  const [formState, setFormState] = useState<Omit<EffectiveRemedyItem, 'id'>>({
    title: '', description: '', imageUrl: '', videoUrl: '', textUrl: ''
  });

  const openModal = (item: EffectiveRemedyItem | null = null) => {
    setCurrentItem(item);
    setFormState(item ? { ...item } : { title: '', description: '', imageUrl: '', videoUrl: '', textUrl: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      onItemsChange(items.map(p => (p.id === currentItem.id ? { ...currentItem, ...formState } : p)));
    } else {
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
        <h2 className="text-xl font-bold text-gray-800">Gerenciar "O Remédio Eficaz"</h2>
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
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4 font-medium">{item.title}</td>
                <td className="text-center py-3 px-4">
                  <button onClick={() => openModal(item)} className="p-2 text-gray-500 hover:text-blue-600"><PencilIcon className="h-5 w-5" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={2} className="text-center py-4 text-gray-500">Nenhum conteúdo cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative animate-fade-in-scale max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Conteúdo</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><XIcon className="h-6 w-6" /></button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formState.title} onChange={handleFormChange} placeholder="Título" className="w-full rounded-md border-gray-300" required />
              <textarea name="description" value={formState.description} onChange={handleFormChange} placeholder="Descrição" rows={5} className="w-full rounded-md border-gray-300" required />
              <input type="url" name="imageUrl" value={formState.imageUrl} onChange={handleFormChange} placeholder="URL da Imagem" className="w-full rounded-md border-gray-300" required />
              <input type="url" name="videoUrl" value={formState.videoUrl || ''} onChange={handleFormChange} placeholder="URL do Vídeo (Opcional)" className="w-full rounded-md border-gray-300" />
              <input type="url" name="textUrl" value={formState.textUrl || ''} onChange={handleFormChange} placeholder="URL do Texto/Artigo (Opcional)" className="w-full rounded-md border-gray-300" />
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

export default EffectiveRemedyManager;