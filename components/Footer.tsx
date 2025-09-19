import React from 'react';
import { YoutubeIcon, TiktokIcon, InstagramIcon, LinkedInIcon } from './icons';

interface FooterProps {
    onNavigateToAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
    const socialLinks = [
        { name: 'Youtube', url: "https://www.youtube.com/@prosaeponteado", icon: <YoutubeIcon className="h-6 w-6" /> },
        { name: 'Tiktok', url: "https://www.tiktok.com/@acp_violabrazil", icon: <TiktokIcon className="h-6 w-6" /> },
        { name: 'Instagram', url: "https://www.instagram.com/acp_violabrazil", icon: <InstagramIcon className="h-6 w-6" /> },
        { name: 'LinkedIn', url: "https://www.linkedin.com/in/hitz-ponteio-401199230/", icon: <LinkedInIcon className="h-6 w-6" /> },
    ];

    return (
        <footer className="bg-brand-primary text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-serif font-bold">Prosa e Ponteado</h3>
                        <p className="text-gray-400 mt-2">Biblioteca Online da Cultura Brasileira</p>
                        <a href="mailto:prosaeponteado@gmail.com" className="text-brand-accent hover:text-white transition-colors mt-2 inline-block">
                           prosaeponteado@gmail.com
                        </a>
                    </div>
                    <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center">
                         <div className="flex space-x-6 mb-6 md:mb-0">
                            {socialLinks.map((social) => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform hover:scale-110">
                                    <span className="sr-only">{social.name}</span>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <button onClick={onNavigateToAdmin} className="font-medium bg-brand-secondary text-white py-2 px-4 rounded-md hover:bg-brand-accent hover:text-brand-primary transition-colors">
                            Área de Membros
                        </button>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Prosa e Ponteado. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;