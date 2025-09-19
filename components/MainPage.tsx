import React from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import { 
    QuoteIcon, 
    SparklesIcon, 
    CalendarIcon, 
    BulletinIcon, 
    BookOpenIcon, 
    MusicIcon, 
    VideoCameraIcon, 
    ShoppingBagIcon, 
    CourseIcon as CourseIconNew, 
    HeartIcon,
    PeopleIcon,
    ImageIcon,
    PodcastIcon
} from './icons';
import type { MainPageContent } from '../types';

interface MainPageProps {
    onNavigateToAdmin: () => void;
    onNavigateToAITools: () => void;
    onNavigateToSchedule: () => void;
    onNavigateToCulturalKnowledge: () => void;
    onNavigateToProductsAndServices: () => void;
    onNavigateToCourses: () => void;
    onNavigateToEffectiveRemedy: () => void;
    onNavigateToDemystifyAI: () => void;
    onNavigateToPartners: () => void;
    onNavigateToEventsBulletin: () => void;
    onNavigateToImageGallery: () => void;
    onNavigateToPodcastGallery: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
    content: MainPageContent;
}

const Section: React.FC<{title: string, children: React.ReactNode, className?: string, id?: string}> = ({ title, children, className, id }) => (
    <section id={id} className={`py-16 md:py-20 scroll-mt-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif text-brand-primary text-center mb-12">{title}</h2>
            {children}
        </div>
    </section>
);

const InfoCard: React.FC<{ title: string, content: string, icon: React.ReactNode }> = ({ title, content, icon }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full">
        <div className="text-brand-secondary mb-4">
            {icon}
        </div>
        <h3 className="font-serif text-xl text-brand-primary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
    </div>
);


const MainPage: React.FC<MainPageProps> = ({ 
    onNavigateToAdmin, onNavigateToAITools, onNavigateToSchedule, onNavigateToCulturalKnowledge, onNavigateToProductsAndServices, onNavigateToCourses,
    onNavigateToEffectiveRemedy, onNavigateToDemystifyAI, onNavigateToPartners, onNavigateToEventsBulletin, onNavigateToImageGallery, onNavigateToPodcastGallery,
    isLoggedIn, onLogout, onOpenSubscriptionModal,
    theme, onThemeChange, fontSize, onFontSizeChange, content
}) => {
    const sections = [
        { id: 'ai-tools', title: "Ferramentas de IA", content: "Mergulhe em experiências de aprendizado interativas e utilize nossas ferramentas para otimizar seus estudos sobre a cultura brasileira.", icon: <SparklesIcon className="h-10 w-10"/> },
        { id: 'image-gallery', title: "Galeria de Imagens (IA)", content: "Explore uma galeria de imagens únicas, todas criadas por nossa equipe utilizando Inteligência Artificial para ilustrar a cultura brasileira.", icon: <ImageIcon className="h-10 w-10"/> },
        { id: 'podcast-gallery', title: "Galeria de Podcasts (IA)", content: "Ouça e leia roteiros e conteúdos sobre a cultura brasileira, gerados por nossa equipe com o poder da Inteligência Artificial.", icon: <PodcastIcon className="h-10 w-10"/> },
        { id: 'monthly-schedule', title: "Nossa Programação Mensal", content: "Confira nossa agenda completa de eventos, cursos e lives para não perder nada.", icon: <CalendarIcon className="h-10 w-10"/> },
        { href: "https://www.youtube.com/@prosaeponteado/live", title: "Lives no Youtube", content: "Participe de nossas transmissões ao vivo com artistas, especialistas e debates sobre a cultura brasileira.", icon: <VideoCameraIcon className="h-10 w-10"/> },
        { id: 'events-bulletin', title: "Boletim de Eventos Comemorativos", content: "Fique por dentro dos eventos culturais mais importantes que acontecem em todo o país.", icon: <BulletinIcon className="h-10 w-10"/> },
        { id: 'cultural-knowledge', title: "O Saber Cultural", content: "Explore artigos, vídeos e materiais sobre as diversas facetas da cultura brasileira.", icon: <BookOpenIcon className="h-10 w-10"/> },
        { id: 'products-services', title: "Produtos e Serviços", content: "Conheça nossos produtos digitais, cursos e serviços personalizados para amantes da cultura.", icon: <ShoppingBagIcon className="h-10 w-10"/> },
        { id: 'courses', title: "Nossos Cursos", content: "Aprofunde seus conhecimentos com nossos cursos online sobre música, história e artes brasileiras.", icon: <CourseIconNew className="h-10 w-10"/> },
        { id: 'effective-remedy', title: "O Remédio Eficaz", content: "Descubra como a arte e a cultura podem ser um poderoso remédio para a alma.", icon: <HeartIcon className="h-10 w-10"/> },
        { id: 'demystify-ai', title: "Desmistificação da IA", content: "Entenda como a Inteligência Artificial pode ser uma aliada na preservação e difusão da cultura.", icon: <SparklesIcon className="h-10 w-10"/> },
        { id: 'partners', title: "Parceiros e Anunciantes", content: "Conheça as empresas e instituições que apoiam e acreditam no nosso projeto.", icon: <PeopleIcon className="h-10 w-10"/> },
    ];
    
    const handleHeroScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // The header has h-20, which is 5rem or 80px in default tailwind.
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="bg-brand-bg">
            <PublicHeader 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                onOpenSubscriptionModal={onOpenSubscriptionModal}
                theme={theme}
                onThemeChange={onThemeChange}
                fontSize={fontSize}
                onFontSizeChange={onFontSizeChange}
            />
            
            <main>
                {/* 1. Capa Principal (com imagem) */}
                <div 
                    className="relative h-[70vh] bg-cover bg-center text-white flex items-center justify-center"
                    style={{ backgroundImage: `url(${content.coverImageUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-5xl md:text-7xl font-serif leading-tight tracking-tight">Prosa e Ponteado</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">Sua biblioteca online dedicada a preservar e difundir a riqueza da cultura brasileira.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a 
                                href="#iniciativas" 
                                onClick={(e) => handleHeroScrollClick(e, '#iniciativas')}
                                className="inline-block bg-brand-accent text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-white transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                                Explorar Conteúdo
                            </a>
                            <a 
                                href="#quem-somos" 
                                onClick={(e) => handleHeroScrollClick(e, '#quem-somos')}
                                className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-brand-primary transition-all duration-300 ease-in-out hover:scale-105 shadow-lg">
                                Quem Somos
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2 & 3. Quem Somos (Foto e Texto) */}
                <Section id="quem-somos" title="Quem Somos" className="bg-white">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="md:w-1/2">
                            <img src={content.aboutUsImageUrl} alt="Nossa equipe" className="rounded-lg shadow-2xl w-full h-full object-cover" />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                {content.aboutUsText1}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {content.aboutUsText2}
                            </p>
                        </div>
                    </div>
                </Section>
                
                {/* 4. Mensagem do dia e avatar cultural */}
                <Section title="Mensagem do Dia" className="bg-brand-secondary/10">
                     <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <QuoteIcon className="h-12 w-12 text-brand-secondary mb-6" />
                        <p className="text-3xl font-serif text-brand-primary italic font-light">
                           "{content.dailyMessageText}"
                        </p>
                        <span className="mt-6 text-lg text-gray-500 font-semibold tracking-wider">- {content.dailyMessageAuthor} -</span>
                    </div>
                </Section>
                
                {/* Outras seções */}
                 <div id="iniciativas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
                    <h2 className="text-4xl font-serif text-brand-primary text-center mb-12">Nossas Iniciativas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sections.map(sec => {
                            // @ts-ignore
                            if (sec.href) {
                                return (
                                    <a key={sec.title} href={sec.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                                        <InfoCard title={sec.title} content={sec.content} icon={sec.icon} />
                                    </a>
                                );
                            }
                            // @ts-ignore
                            if (sec.id) {
                                const navMap: { [key: string]: () => void } = {
                                    'ai-tools': onNavigateToAITools,
                                    'image-gallery': onNavigateToImageGallery,
                                    'podcast-gallery': onNavigateToPodcastGallery,
                                    'monthly-schedule': onNavigateToSchedule,
                                    'cultural-knowledge': onNavigateToCulturalKnowledge,
                                    'products-services': onNavigateToProductsAndServices,
                                    'courses': onNavigateToCourses,
                                    'effective-remedy': onNavigateToEffectiveRemedy,
                                    'demystify-ai': onNavigateToDemystifyAI,
                                    'partners': onNavigateToPartners,
                                    'events-bulletin': onNavigateToEventsBulletin,
                                };
                                const handleClick = navMap[sec.id];

                                if (handleClick) {
                                    return (
                                        <div key={sec.title} onClick={handleClick} className="cursor-pointer h-full">
                                            <InfoCard title={sec.title} content={sec.content} icon={sec.icon} />
                                        </div>
                                    );
                                }
                            }
                            return <InfoCard key={sec.title} title={sec.title} content={sec.content} icon={sec.icon} />;
                        })}
                    </div>
                 </div>

                 {/* 12. Depoimentos */}
                <Section id="depoimentos" title="O Que Dizem Nossos Membros" className="bg-white">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-brand-bg p-8 rounded-lg shadow-lg text-center border-t-4 border-brand-accent">
                                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                                <p className="font-semibold text-brand-primary">- {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </Section>
                
                {/* 13. Fale Conosco */}
                <Section id="contato" title="Fale Conosco" className="bg-brand-bg">
                    <div className="max-w-xl mx-auto text-center">
                        <p className="text-gray-600 mb-8 text-lg">Tem alguma dúvida, sugestão ou proposta? Adoraríamos ouvir você!</p>
                        <a href={`mailto:${content.contactEmail}`} className="inline-block bg-brand-secondary text-white font-bold py-4 px-10 rounded-lg hover:bg-brand-primary transition-all duration-300 ease-in-out text-lg shadow-lg">
                            Enviar Email
                        </a>
                    </div>
                </Section>

                {/* 14. Planos de Assinaturas */}
                <Section title="Apoie a Cultura Brasileira" className="bg-brand-primary text-white">
                    <div className="text-center">
                        <p className="mb-8 text-lg text-gray-300">Tenha acesso a conteúdos exclusivos e apoie nosso projeto a continuar crescendo.</p>
                         <button 
                            onClick={onOpenSubscriptionModal}
                            className="bg-brand-accent text-brand-primary font-bold py-4 px-10 rounded-lg hover:bg-white transition-all duration-300 ease-in-out text-lg shadow-lg">
                            Conheça Nossos Planos
                        </button>
                    </div>
                </Section>


            </main>

            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
}

export default MainPage;