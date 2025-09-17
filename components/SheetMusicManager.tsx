import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { SheetMusic } from '../types';

interface SheetMusicManagerProps {
  onBack: () => void;
  sheetMusic: SheetMusic[];
  onSheetMusicChange: (newSheetMusic: SheetMusic[]) => void;
}

const SheetMusicManager: React.FC<SheetMusicManagerProps> = ({ onBack, sheetMusic, onSheetMusicChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SheetMusic | null>(null);
  const [formState, setFormState] = useState({ title: '', url: '' });

  const openModal = (item: SheetMusic | null = null) => {
    setCurrentItem(item);
    setFormState(item ? { title: item.title, url: item.url } : { title: '', url: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      // Edit
      const updatedSheetMusic = sheetMusic.map(item =>
        item.id === currentItem.id ? { ...item, ...formState } : item
      );
      onSheetMusicChange(updatedSheetMusic);
    } else {
      // Add
      const newItem: SheetMusic = {
        id: String(Date.now()),
        ...formState
      };
      onSheetMusicChange([...sheetMusic, newItem]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta partitura?')) {
      onSheetMusicChange(sheetMusic.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar Partituras (PDF)</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Partitura
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Título</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">URL</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sheetMusic.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4">{item.title}</td>
                <td className="text-left py-3 px-4">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{item.url}</a>
                </td>
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
             {sheetMusic.length === 0 && (
                <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">Nenhuma partitura cadastrada.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-scale">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Partitura</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
              <XIcon className="h-6 w-6" />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título da Partitura</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formState.title}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL do Arquivo PDF</label>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    value={formState.url}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/partitura.pdf"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SheetMusicManager;