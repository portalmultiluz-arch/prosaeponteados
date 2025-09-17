import React from 'react';
import { MicrophoneLogoIcon } from './icons';

interface HeaderProps {
  onLogout: () => void;
  onNavigateToMain: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onNavigateToMain }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToMain(); }} className="flex items-center cursor-pointer">
            <MicrophoneLogoIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 font-bold text-xl text-gray-800">Prosa e Ponteado</span>
          </a>
          <div className="flex items-center space-x-2">
            <button onClick={onLogout} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sair</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;