import React, { useState, useEffect } from 'react';
import { MicrophoneLogoIcon } from './icons';

interface PublicHeaderProps {
  onNavigateToMain?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onOpenSubscriptionModal: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
  fontSize: number;
  onFontSizeChange: (direction: 'increase' | 'decrease') => void;
}

const navLinks = [
    { name: 'Quem Somos', href: '#quem-somos' },
    { name: 'Iniciativas', href: '#iniciativas' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' }
];

const themes = [
    { name: 'default', color: '#4a3a30' },
    { name: 'serra', color: '#2c3e50' },
    { name: 'mar', color: '#004d40' },
    { name: 'sertao', color: '#bf360c' },
    { name: 'noite', color: '#212121' },
];

const PublicHeader: React.FC<PublicHeaderProps> = ({ 
    onNavigateToMain, isLoggedIn, onLogout, onOpenSubscriptionModal,
    theme, onThemeChange, fontSize, onFontSizeChange 
}) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (onNavigateToMain) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -75% 0px' } // Highlights when section is near top of viewport
    );

    const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [onNavigateToMain]);


  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToMain) {
      onNavigateToMain();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerOffset = 80; // Corresponds to h-20 class on header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
             top: offsetPosition,
             behavior: "smooth"
        });
    }
  };

  return (
    <header className="bg-brand-bg/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" onClick={handleLogoClick} className="flex items-center cursor-pointer">
            <MicrophoneLogoIcon className="h-9 w-9 text-brand-secondary" />
            <span className="ml-3 font-serif text-2xl text-brand-primary">Prosa e Ponteado</span>
          </a>
          <div className="flex items-center">
             <div className="hidden lg:flex items-center space-x-6">
                <nav className="flex space-x-6">
                    {onNavigateToMain === undefined && navLinks.map(link => {
                    const isActive = `#${activeSection}` === link.href;
                    return (
                        <a
                        href={link.href}
                        key={link.name}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                            isActive
                            ? 'text-brand-secondary font-bold'
                            : 'text-gray-600 hover:text-brand-secondary'
                        }`}
                        >
                        {link.name}
                        </a>
                    );
                    })}
                </nav>

                <button
                    onClick={onOpenSubscriptionModal}
                    className="text-sm font-medium tracking-wider uppercase text-gray-600 hover:text-brand-secondary"
                >
                    Nossos Planos
                </button>

                {/* Accessibility Controls */}
                <div className="flex items-center space-x-4 border-l pl-6">
                    {/* Font Size */}
                    <div className="flex items-center gap-1">
                        <button onClick={() => onFontSizeChange('decrease')} className="p-1 text-gray-600 hover:text-brand-primary" aria-label="Diminuir fonte">
                            <span className="font-bold text-sm">A-</span>
                        </button>
                        <button onClick={() => onFontSizeChange('increase')} className="p-1 text-gray-600 hover:text-brand-primary" aria-label="Aumentar fonte">
                             <span className="font-bold text-lg">A+</span>
                        </button>
                    </div>
                    {/* Theme Switcher */}
                    <div className="flex items-center space-x-2">
                        {themes.map(t => (
                            <button
                                key={t.name}
                                onClick={() => onThemeChange(t.name)}
                                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${t.name === theme ? 'border-brand-secondary scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: t.color }}
                                aria-label={`Mudar para tema ${t.name}`}
                            />
                        ))}
                    </div>
                </div>

                {isLoggedIn && onLogout && (
                    <button
                        onClick={onLogout}
                        className="ml-6 bg-red-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out text-sm"
                    >
                        Sair
                    </button>
                )}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
