import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { Plan } from '../types';

interface SubscriptionManagerProps {
    onBack: () => void;
    plans: Plan[];
    onPlansChange: (newPlans: Plan[]) => void;
}

// Define a type for the form state where 'features' is a single string for the textarea
interface PlanFormState extends Omit<Plan, 'id' | 'features'> {
  features: string;
}


const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ onBack, plans, onPlansChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Plan | null>(null);
  const [formState, setFormState] = useState<PlanFormState>({ name: '', price: '', features: '', popular: false, color: 'bg-gray-200', textColor: 'text-gray-800' });

  const openModal = (item: Plan | null = null) => {
    setCurrentItem(item);
    // If editing, convert features array to a single string for the textarea.
    // Otherwise, use a clean initial state.
    setFormState(item 
      ? { ...item, features: item.features.join('\n') } 
      : { name: '', price: '', features: '', popular: false, color: 'bg-gray-200', textColor: 'text-gray-800' }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // Use type assertion for the checkbox's 'checked' property
    const checked = (e.target as HTMLInputElement).checked;
    setFormState(prev => ({ ...prev, [name]: isCheckbox ? checked : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert the features string back to an array of strings before saving
    const finalPlanData = {
        ...formState,
        features: formState.features.split('\n').filter(f => f.trim() !== ''),
    };

    if (currentItem) {
      // Edit: merge the updated data with the existing plan structure
      onPlansChange(plans.map(p => (p.id === currentItem.id ? { ...p, ...finalPlanData } : p)));
    } else {
      // Add: create a complete new Plan object
      const newItem: Plan = {
        id: String(Date.now()),
        ...finalPlanData
      };
      onPlansChange([...plans, newItem]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      onPlansChange(plans.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar Planos de Assinatura</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Plano
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Nome do Plano</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Preço</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Popular</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {plans.map(plan => (
              <tr key={plan.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4 font-medium">{plan.name}</td>
                <td className="text-left py-3 px-4">{plan.price}</td>
                <td className="text-center py-3 px-4">{plan.popular ? 'Sim' : 'Não'}</td>
                <td className="text-center py-3 px-4">
                  <button onClick={() => openModal(plan)} className="p-2 text-gray-500 hover:text-blue-600" aria-label="Editar">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(plan.id)} className="p-2 text-gray-500 hover:text-red-600" aria-label="Excluir">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
             {plans.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">Nenhum plano cadastrado.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fade-in-scale">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Plano</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
              <XIcon className="h-6 w-6" />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Plano</label>
                        <input type="text" name="name" id="name" value={formState.name} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                        <input type="text" name="price" id="price" value={formState.price} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="R$ 00/mês" required />
                    </div>
                </div>
                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-gray-700">Características (uma por linha)</label>
                  <textarea name="features" id="features" value={formState.features} onChange={handleFormChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Cor de Fundo (Tailwind)</label>
                        <input type="text" name="color" id="color" value={formState.color} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="ex: bg-blue-200" required />
                    </div>
                    <div>
                        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">Cor do Texto (Tailwind)</label>
                        <input type="text" name="textColor" id="textColor" value={formState.textColor} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="ex: text-blue-800" required />
                    </div>
                </div>
                <div className="flex items-center">
                    <input id="popular" name="popular" type="checkbox" checked={formState.popular} onChange={handleFormChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">Marcar como popular?</label>
                </div>
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

export default SubscriptionManager;