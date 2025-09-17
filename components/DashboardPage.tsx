import React, { useState } from 'react';
import Header from './Header';
import DashboardCard from './DashboardCard';
import SheetMusicManager from './SheetMusicManager';
import MonthlyScheduleManager from './MonthlyScheduleManager';
import SubscriptionManager from './SubscriptionManager';
import ProductsManager from './ProductsManager';
import CoursesManager from './CoursesManager';
import CulturalKnowledgeManager from './CulturalKnowledgeManager';
import EffectiveRemedyManager from './EffectiveRemedyManager';
import DemystifyAIManager from './DemystifyAIManager';
import PartnersManager from './PartnersManager';
import EventsBulletinManager from './EventsBulletinManager';
import MainPageContentManager from './MainPageContentManager';
import AIToolsContentManager from './AIToolsContentManager';
import ImageGeneratorManager from './ImageGeneratorManager';
import PodcastGeneratorManager from './PodcastGeneratorManager';
import { dashboardSections } from '../constants';
import { ArrowLeftIcon } from './icons';
import type { Plan, ScheduleEvent, SheetMusic, Product, Course, CulturalKnowledgeItem, EffectiveRemedyItem, DemystifyAIItem, PartnerItem, BulletinEvent, MainPageContent, AIToolContent, GeneratedImage, GeneratedPodcast } from '../types';

interface DashboardPageProps {
  onLogout: () => void;
  onNavigateToMain: () => void;
  plans: Plan[];
  onPlansChange: (newPlans: Plan[]) => void;
  events: ScheduleEvent[];
  onEventsChange: (newEvents: ScheduleEvent[]) => void;
  sheetMusic: SheetMusic[];
  onSheetMusicChange: (newSheetMusic: SheetMusic[]) => void;
  products: Product[];
  onProductsChange: (newProducts: Product[]) => void;
  courses: Course[];
  onCoursesChange: (newCourses: Course[]) => void;
  culturalKnowledge: CulturalKnowledgeItem[];
  onCulturalKnowledgeChange: (newItems: CulturalKnowledgeItem[]) => void;
  effectiveRemedy: EffectiveRemedyItem[];
  onEffectiveRemedyChange: (newItems: EffectiveRemedyItem[]) => void;
  demystifyAI: DemystifyAIItem[];
  onDemystifyAIChange: (newItems: DemystifyAIItem[]) => void;
  partners: PartnerItem[];
  onPartnersChange: (newItems: PartnerItem[]) => void;
  bulletinEvents: BulletinEvent[];
  onBulletinEventsChange: (newEvents: BulletinEvent[]) => void;
  mainPageContent: MainPageContent;
  onMainPageContentChange: (newContent: MainPageContent) => void;
  aiToolsContent: AIToolContent[];
  onAIToolsContentChange: (newContent: AIToolContent[]) => void;
  generatedImages: GeneratedImage[];
  onGeneratedImagesChange: (newImages: GeneratedImage[]) => void;
  generatedPodcasts: GeneratedPodcast[];
  onGeneratedPodcastsChange: (newPodcasts: GeneratedPodcast[]) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onLogout, onNavigateToMain, 
  plans, onPlansChange, 
  events, onEventsChange, 
  sheetMusic, onSheetMusicChange,
  products, onProductsChange,
  courses, onCoursesChange,
  culturalKnowledge, onCulturalKnowledgeChange,
  effectiveRemedy, onEffectiveRemedyChange,
  demystifyAI, onDemystifyAIChange,
  partners, onPartnersChange,
  bulletinEvents, onBulletinEventsChange,
  mainPageContent, onMainPageContentChange,
  aiToolsContent, onAIToolsContentChange,
  generatedImages, onGeneratedImagesChange,
  generatedPodcasts, onGeneratedPodcastsChange
}) => {
  const [activeView, setActiveView] = useState<string | null>(null);

  const renderActiveComponent = () => {
    if (!activeView) return null;
    switch (activeView) {
      case 'manage-main-page-content':
        return <MainPageContentManager onBack={() => setActiveView(null)} content={mainPageContent} onContentChange={onMainPageContentChange} />;
      case 'manage-ai-tools-content':
        return <AIToolsContentManager onBack={() => setActiveView(null)} items={aiToolsContent} onItemsChange={onAIToolsContentChange} />;
      case 'manage-image-generator':
        return <ImageGeneratorManager onBack={() => setActiveView(null)} items={generatedImages} onItemsChange={onGeneratedImagesChange} />;
      case 'manage-podcast-generator':
        return <PodcastGeneratorManager onBack={() => setActiveView(null)} items={generatedPodcasts} onItemsChange={onGeneratedPodcastsChange} />;
      case 'manage-sheet-music':
        return <SheetMusicManager onBack={() => setActiveView(null)} sheetMusic={sheetMusic} onSheetMusicChange={onSheetMusicChange} />;
      case 'manage-monthly-schedule':
        return <MonthlyScheduleManager onBack={() => setActiveView(null)} events={events} onEventsChange={onEventsChange} />;
      case 'manage-subscriptions':
        return <SubscriptionManager onBack={() => setActiveView(null)} plans={plans} onPlansChange={onPlansChange} />;
      case 'manage-products-services':
        return <ProductsManager onBack={() => setActiveView(null)} products={products} onProductsChange={onProductsChange} />;
      case 'manage-courses':
        return <CoursesManager onBack={() => setActiveView(null)} courses={courses} onCoursesChange={onCoursesChange} />;
      case 'manage-cultural-knowledge':
        return <CulturalKnowledgeManager onBack={() => setActiveView(null)} items={culturalKnowledge} onItemsChange={onCulturalKnowledgeChange} />;
      case 'manage-effective-remedy':
        return <EffectiveRemedyManager onBack={() => setActiveView(null)} items={effectiveRemedy} onItemsChange={onEffectiveRemedyChange} />;
      case 'manage-demystify-ai':
        return <DemystifyAIManager onBack={() => setActiveView(null)} items={demystifyAI} onItemsChange={onDemystifyAIChange} />;
      case 'manage-partners':
        return <PartnersManager onBack={() => setActiveView(null)} items={partners} onItemsChange={onPartnersChange} />;
      case 'manage-events-bulletin':
        return <EventsBulletinManager onBack={() => setActiveView(null)} events={bulletinEvents} onEventsChange={onBulletinEventsChange} />;
      default:
        return null;
    }
  };

  const ActiveComponent = renderActiveComponent();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLogout={onLogout} onNavigateToMain={onNavigateToMain} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {ActiveComponent ? (
            <div>
              <div className="flex flex-wrap gap-4 justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => setActiveView(null)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Voltar ao Painel
                  </button>
                  <div className="flex items-center gap-3">
                     <button 
                        onClick={onNavigateToMain}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                       Voltar ao Início
                      </button>
                      <button 
                        onClick={onLogout} 
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                      >
                        Sair
                      </button>
                  </div>
              </div>
              {ActiveComponent}
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Painel de Gerenciamento</h1>
                  <p className="text-sm text-gray-500 mt-1">Bem-vindo! Acesse as ferramentas agrupadas por categoria.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {dashboardSections.map((section) => (
                  <DashboardCard
                    key={section.title}
                    title={section.title}
                    icon={section.icon}
                    links={section.links}
                    onLinkClick={(id) => setActiveView(id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;