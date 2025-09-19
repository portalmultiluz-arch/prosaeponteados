import React, { useState } from 'react';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import type { Course } from '../types';
import { UsersIcon, VideoCameraIcon, CheckIcon, SubscriptionIcon } from './icons';

interface CoursesPageProps {
    onNavigateToMain: () => void;
    onNavigateToAdmin: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    onOpenSubscriptionModal: () => void;
    courses: Course[];
    theme: string;
    onThemeChange: (theme: string) => void;
    fontSize: number;
    onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const CourseCard: React.FC<{ course: Course, onSelect: () => void }> = ({ course, onSelect }) => (
    <div 
        className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white flex flex-col"
        onClick={onSelect}
    >
        <div className="relative h-48">
            <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-serif text-brand-primary">{course.title}</h3>
            <p className="text-gray-600 mt-1 text-sm flex-grow">{course.tagline}</p>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm text-gray-500">
                <UsersIcon className="h-4 w-4 mr-2" />
                <span>{course.instructor}</span>
            </div>
        </div>
    </div>
);

const CourseDetailPage: React.FC<{ course: Course, onBack: () => void, onOpenSubscriptionModal: () => void }> = ({ course, onBack, onOpenSubscriptionModal }) => {
    return (
        <div className="animate-fade-in-scale">
            <button 
                onClick={onBack}
                className="mb-8 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Voltar para Cursos
            </button>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe 
                                src={course.videoUrl} 
                                title={course.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50 flex flex-col">
                        <h2 className="text-3xl font-serif text-brand-primary">{course.title}</h2>
                        <div className="mt-4 space-y-3 text-gray-600">
                            <div className="flex items-center gap-3">
                                <UsersIcon className="h-5 w-5 text-brand-secondary"/>
                                <span className="font-semibold">Instrutor: {course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <VideoCameraIcon className="h-5 w-5 text-brand-secondary"/>
                                <span className="font-semibold">Duração Total: {course.duration}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex-grow"></div>
                        <div className="space-y-3">
                             <button className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-5 rounded-lg hover:bg-brand-primary hover:text-white transition-colors">
                                Comprar Acesso por {course.price}
                            </button>
                             <button 
                                onClick={onOpenSubscriptionModal}
                                className="w-full flex items-center justify-center gap-2 bg-brand-secondary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-primary transition-colors"
                            >
                               <SubscriptionIcon className="h-5 w-5"/>
                                Acessar com Assinatura
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                     <p className="prose max-w-none text-gray-700 mb-8">{course.description}</p>
                     <h3 className="text-2xl font-bold text-brand-primary mb-4">Conteúdo do Curso</h3>
                     <div className="space-y-4">
                        {course.modules.map((module, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-lg text-brand-primary">{module.title}</h4>
                                <ul className="mt-2 space-y-2 pl-5">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="flex items-center text-gray-600">
                                            <CheckIcon className="h-5 w-5 text-green-500 mr-3"/>
                                            {lesson}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};


const CoursesPage: React.FC<CoursesPageProps> = ({
    onNavigateToMain, onNavigateToAdmin, isLoggedIn, onLogout, onOpenSubscriptionModal, courses,
    theme, onThemeChange, fontSize, onFontSizeChange
}) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    const renderContent = () => {
        if (selectedCourse) {
            return <CourseDetailPage course={selectedCourse} onBack={() => setSelectedCourse(null)} onOpenSubscriptionModal={onOpenSubscriptionModal} />;
        }

        return (
            <div className="animate-fade-in-scale">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-brand-primary">Nossos Cursos</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Aprofunde seus conhecimentos com nossos cursos online sobre música, história e artes brasileiras, criados por especialistas de diversas localidades.
                    </p>
                    <button 
                        onClick={onNavigateToMain}
                        className="mt-6 inline-flex items-center gap-2 bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors duration-300 ease-in-out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Voltar ao Início
                    </button>
                </div>

                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} onSelect={() => setSelectedCourse(course)} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center bg-white p-10 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700">Nenhum curso disponível no momento.</h3>
                        <p className="text-gray-500 mt-2">Nossa prateleira de cursos está sendo preparada. Volte em breve para conferir as novidades!</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-brand-bg flex flex-col min-h-screen">
            <PublicHeader 
                onNavigateToMain={onNavigateToMain} 
                isLoggedIn={isLoggedIn} 
                onLogout={onLogout} 
                onOpenSubscriptionModal={onOpenSubscriptionModal}
                theme={theme}
                onThemeChange={onThemeChange}
                fontSize={fontSize}
                onFontSizeChange={onFontSizeChange}
            />
            <main className="flex-grow py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {renderContent()}
                </div>
            </main>
            <Footer onNavigateToAdmin={onNavigateToAdmin} />
        </div>
    );
};

export default CoursesPage;