import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, XIcon } from './icons';
import type { Course, CourseModule } from '../types';

interface CoursesManagerProps {
  onBack: () => void;
  courses: Course[];
  onCoursesChange: (newCourses: Course[]) => void;
}

const CoursesManager: React.FC<CoursesManagerProps> = ({ onBack, courses, onCoursesChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Course | null>(null);
  
  const initialFormState: Omit<Course, 'id' | 'modules'> & { modules: string } = {
    title: '', tagline: '', description: '', instructor: '', duration: '', imageUrl: '', videoUrl: '', price: '', modules: ''
  };
  const [formState, setFormState] = useState(initialFormState);

  const modulesToString = (modules: CourseModule[]): string => {
    return modules.map(m => `[${m.title}]\n${m.lessons.join('\n')}`).join('\n\n');
  };
  
  const stringToModules = (text: string): CourseModule[] => {
    const moduleBlocks = text.trim().split('\n\n');
    return moduleBlocks.map(block => {
      const lines = block.split('\n');
      const title = lines[0].replace('[', '').replace(']', '').trim();
      const lessons = lines.slice(1).filter(l => l.trim() !== '');
      return { title, lessons };
    }).filter(m => m.title);
  };

  const openModal = (item: Course | null = null) => {
    setCurrentItem(item);
    if (item) {
        setFormState({ ...item, modules: modulesToString(item.modules) });
    } else {
        setFormState(initialFormState);
    }
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
    const finalCourseData = { ...formState, modules: stringToModules(formState.modules) };
    if (currentItem) {
      // Edit
      onCoursesChange(courses.map(c => (c.id === currentItem.id ? { ...currentItem, ...finalCourseData } : c)));
    } else {
      // Add
      onCoursesChange([...courses, { id: String(Date.now()), ...finalCourseData }]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      onCoursesChange(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gerenciar Cursos</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-5 w-5" />
          Adicionar Curso
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Título do Curso</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Instrutor</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {courses.map(item => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="text-left py-3 px-4 font-medium">{item.title}</td>
                <td className="text-left py-3 px-4">{item.instructor}</td>
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
            {courses.length === 0 && (
              <tr><td colSpan={3} className="text-center py-4 text-gray-500">Nenhum curso cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative animate-fade-in-scale max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{currentItem ? 'Editar' : 'Adicionar'} Curso</h3>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
              <XIcon className="h-6 w-6" />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" placeholder="Título do Curso" value={formState.title} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
              <input type="text" name="tagline" placeholder="Tagline (Chamada Curta)" value={formState.tagline} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="instructor" placeholder="Nome do Instrutor" value={formState.instructor} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
                <input type="text" name="duration" placeholder="Duração (Ex: 8 Horas)" value={formState.duration} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
              </div>
              <textarea name="description" placeholder="Descrição Completa" value={formState.description} onChange={handleFormChange} rows={4} className="w-full rounded-md border-gray-300" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="url" name="imageUrl" placeholder="URL da Imagem de Capa" value={formState.imageUrl} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
                <input type="url" name="videoUrl" placeholder="URL do Vídeo (YouTube Embed)" value={formState.videoUrl} onChange={handleFormChange} className="w-full rounded-md border-gray-300" required />
              </div>
               <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (Ticket Avulso)</label>
                  <input type="text" name="price" id="price" value={formState.price} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: R$ 49,90" required />
              </div>
              <div>
                <label htmlFor="modules" className="block text-sm font-medium text-gray-700">Módulos e Aulas</label>
                <textarea name="modules" id="modules" value={formState.modules} onChange={handleFormChange} rows={8} className="mt-1 block w-full rounded-md border-gray-300 font-mono text-sm" placeholder="Formato:[Título do Módulo 1]&#10;Aula 1.1&#10;Aula 1.2&#10;&#10;[Título do Módulo 2]&#10;Aula 2.1" required />
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

export default CoursesManager;