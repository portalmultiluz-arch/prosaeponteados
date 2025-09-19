import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { ScheduleEvent } from '../types';

interface MonthlyScheduleManagerProps {
    onBack: () => void;
    events: ScheduleEvent[];
    onEventsChange: (newEvents: ScheduleEvent[]) => void;
}

const eventTypes: ScheduleEvent['type'][] = ['Live', 'Evento', 'Videoaula', 'Parceiro'];

const MonthlyScheduleManager: React.FC<MonthlyScheduleManagerProps> = ({ onBack, events, onEventsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ScheduleEvent | null>(null);
  const [formState, setFormState] = useState<Omit<ScheduleEvent, 'id'>>({ title: '', type: 'Live', date: '', time: '', description: '' });

  const openModal = (item: ScheduleEvent | null = null) => {
    setCurrentItem(item);
    setFormState(item ? { ...item } : { title: '', type: 'Live', date: '', time: '', description: '' });
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
      const updatedEvents = events.map(item =>
        item.id === currentItem.id ? { ...item, ...formState } : item
      );
      onEventsChange(updatedEvents);
    } else {
      // Add
      const newItem: ScheduleEvent = {
        id: String(Date.now()),
        ...formState
      };
      onEventsChange([...events, newItem]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      onEventsChange(events.filter(item => item.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar Programação Mensal</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Evento
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Data</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Título</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Tipo</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4 whitespace-nowrap">{new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')} às {item.time}</td>
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
             {events.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">Nenhum evento cadastrado.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-scale">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Evento</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
              <XIcon className="h-6 w-6" />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Evento</label>
                  <input type="text" name="title" id="title" value={formState.title} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select name="type" id="type" value={formState.type} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
                      {eventTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" name="date" id="date" value={formState.date} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                    <input type="time" name="time" id="time" value={formState.time} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea name="description" id="description" value={formState.description} onChange={handleFormChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
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

export default MonthlyScheduleManager;