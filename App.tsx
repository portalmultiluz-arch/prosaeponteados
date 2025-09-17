
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import MainPage from './components/MainPage';
import AIToolsPage from './components/AIToolsPage';
import MonthlySchedulePage from './components/MonthlySchedulePage';
import CulturalKnowledgePage from './components/CulturalKnowledgePage';
import ProductsAndServicesPage from './components/ProductsAndServicesPage';
import CoursesPage from './components/CoursesPage';
import EffectiveRemedyPage from './components/EffectiveRemedyPage';
import DemystifyAIPage from './components/DemystifyAIPage';
import PartnersPage from './components/PartnersPage';
import EventsBulletinPage from './components/EventsBulletinPage';
import SubscriptionModal from './components/SubscriptionModal';
import ImageGalleryPage from './components/ImageGalleryPage';
import PodcastGalleryPage from './components/PodcastGalleryPage';
import { initialPlans, initialScheduleEvents, initialSheetMusic, initialProducts, initialCourses, initialCulturalKnowledge, initialEffectiveRemedy, initialDemystifyAI, initialPartners, initialBulletinEvents, initialMainPageContent, initialAIToolsContent, initialGeneratedImages, initialGeneratedPodcasts } from './constants';
import type { Plan, ScheduleEvent, SheetMusic, Product, Course, CulturalKnowledgeItem, EffectiveRemedyItem, DemystifyAIItem, PartnerItem, BulletinEvent, MainPageContent, AIToolContent, GeneratedImage, GeneratedPodcast } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'admin' | 'ai-tools' | 'schedule' | 'cultural-knowledge' | 'products-services' | 'courses' | 'effective-remedy' | 'demystify-ai' | 'partners' | 'events-bulletin' | 'image-gallery' | 'podcast-gallery'>('main');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [events, setEvents] = useState<ScheduleEvent[]>(initialScheduleEvents);
  const [sheetMusic, setSheetMusic] = useState<SheetMusic[]>(initialSheetMusic);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [culturalKnowledge, setCulturalKnowledge] = useState<CulturalKnowledgeItem[]>(initialCulturalKnowledge);
  const [effectiveRemedy, setEffectiveRemedy] = useState<EffectiveRemedyItem[]>(initialEffectiveRemedy);
  const [demystifyAI, setDemystifyAI] = useState<DemystifyAIItem[]>(initialDemystifyAI);
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [bulletinEvents, setBulletinEvents] = useState<BulletinEvent[]>(initialBulletinEvents);
  const [mainPageContent, setMainPageContent] = useState<MainPageContent>(initialMainPageContent);
  const [aiToolsContent, setAiToolsContent] = useState<AIToolContent[]>(initialAIToolsContent);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(initialGeneratedImages);
  const [generatedPodcasts, setGeneratedPodcasts] = useState<GeneratedPodcast[]>(initialGeneratedPodcasts);
  
  // State for theme and font size with localStorage persistence
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'default');
  const [fontSize, setFontSize] = useState(() => parseFloat(localStorage.getItem('site-font-size') || '16'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('site-font-size', String(fontSize));
  }, [fontSize]);

  const handleThemeChange = (newTheme: string) => setTheme(newTheme);
  const handleFontSizeChange = (direction: 'increase' | 'decrease') => {
    setFontSize(prevSize => {
        const newSize = direction === 'increase' ? Math.min(20, prevSize + 1) : Math.max(12, prevSize - 1);
        return newSize;
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const navigateToAdmin = () => setView('admin');
  const navigateToMain = () => setView('main');
  const navigateToAITools = () => setView('ai-tools');
  const navigateToSchedule = () => setView('schedule');
  const navigateToCulturalKnowledge = () => setView('cultural-knowledge');
  const navigateToProductsAndServices = () => setView('products-services');
  const navigateToCourses = () => setView('courses');
  const navigateToEffectiveRemedy = () => setView('effective-remedy');
  const navigateToDemystifyAI = () => setView('demystify-ai');
  const navigateToPartners = () => setView('partners');
  const navigateToEventsBulletin = () => setView('events-bulletin');
  const navigateToImageGallery = () => setView('image-gallery');
  const navigateToPodcastGallery = () => setView('podcast-gallery');

  const openSubscriptionModal = () => setIsSubscriptionModalOpen(true);
  const closeSubscriptionModal = () => setIsSubscriptionModalOpen(false);
  
  const commonPageProps = {
    isLoggedIn,
    onLogout: handleLogout,
    onOpenSubscriptionModal: openSubscriptionModal,
    theme,
    onThemeChange: handleThemeChange,
    fontSize,
    onFontSizeChange: handleFontSizeChange,
  };

  const renderAdminView = () => {
    if (isLoggedIn) {
      return <DashboardPage 
                onLogout={handleLogout} 
                onNavigateToMain={navigateToMain} 
                plans={plans} 
                onPlansChange={setPlans}
                events={events}
                onEventsChange={setEvents} 
                sheetMusic={sheetMusic}
                onSheetMusicChange={setSheetMusic}
                products={products}
                onProductsChange={setProducts}
                courses={courses}
                onCoursesChange={setCourses}
                culturalKnowledge={culturalKnowledge}
                onCulturalKnowledgeChange={setCulturalKnowledge}
                effectiveRemedy={effectiveRemedy}
                onEffectiveRemedyChange={setEffectiveRemedy}
                demystifyAI={demystifyAI}
                onDemystifyAIChange={setDemystifyAI}
                partners={partners}
                onPartnersChange={setPartners}
                bulletinEvents={bulletinEvents}
                onBulletinEventsChange={setBulletinEvents}
                mainPageContent={mainPageContent}
                onMainPageContentChange={setMainPageContent}
                aiToolsContent={aiToolsContent}
                onAIToolsContentChange={setAiToolsContent}
                generatedImages={generatedImages}
                onGeneratedImagesChange={setGeneratedImages}
                generatedPodcasts={generatedPodcasts}
                onGeneratedPodcastsChange={setGeneratedPodcasts}
              />;
    }
    return <LoginPage onLogin={handleLogin} onNavigateToMain={navigateToMain} />;
  };

  const renderCurrentView = () => {
    const mainPageProps = {
        ...commonPageProps,
        onNavigateToAdmin: navigateToAdmin,
        onNavigateToAITools: navigateToAITools,
        onNavigateToSchedule: navigateToSchedule,
        onNavigateToCulturalKnowledge: navigateToCulturalKnowledge,
        onNavigateToProductsAndServices: navigateToProductsAndServices,
        onNavigateToCourses: navigateToCourses,
        onNavigateToEffectiveRemedy: navigateToEffectiveRemedy,
        onNavigateToDemystifyAI: navigateToDemystifyAI,
        onNavigateToPartners: navigateToPartners,
        onNavigateToEventsBulletin: navigateToEventsBulletin,
        onNavigateToImageGallery: navigateToImageGallery,
        onNavigateToPodcastGallery: navigateToPodcastGallery,
    };

    switch(view) {
      case 'main':
        return <MainPage {...mainPageProps} content={mainPageContent} />;
      case 'ai-tools':
        return <AIToolsPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} sheetMusic={sheetMusic} aiToolsContent={aiToolsContent} {...commonPageProps} />;
      case 'schedule':
        return <MonthlySchedulePage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} events={events} {...commonPageProps} />;
      case 'cultural-knowledge':
        return <CulturalKnowledgePage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} culturalKnowledge={culturalKnowledge} {...commonPageProps} />;
      case 'products-services':
        return <ProductsAndServicesPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} products={products} {...commonPageProps} />;
      case 'courses':
        return <CoursesPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} courses={courses} {...commonPageProps} />;
      case 'effective-remedy':
        return <EffectiveRemedyPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} items={effectiveRemedy} {...commonPageProps} />;
      case 'demystify-ai':
        return <DemystifyAIPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} items={demystifyAI} {...commonPageProps} />;
      case 'partners':
        return <PartnersPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} items={partners} {...commonPageProps} />;
      case 'events-bulletin':
        return <EventsBulletinPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} events={bulletinEvents} {...commonPageProps} />;
      case 'image-gallery':
        return <ImageGalleryPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} images={generatedImages} {...commonPageProps} />;
      case 'podcast-gallery':
        return <PodcastGalleryPage onNavigateToMain={navigateToMain} onNavigateToAdmin={navigateToAdmin} podcasts={generatedPodcasts} {...commonPageProps} />;
      case 'admin':
        return renderAdminView();
      default:
         return <MainPage {...mainPageProps} content={mainPageContent} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={closeSubscriptionModal} plans={plans} />
    </div>
  );
};

export default App;