import React from 'react';
import { MicrophoneLogoIcon } from './icons';

interface PrintableViewProps {
    title: string;
    content: string;
    onClose: () => void;
    disclaimer?: string;
}

const PrintableView: React.FC<PrintableViewProps> = ({ title, content, onClose, disclaimer }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <style>
            {`
                .print-header { display: none; }
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .print-header {
                        display: block !important;
                    }
                }
            `}
            </style>
            <div className="fixed inset-0 bg-gray-100 z-[100] p-4 sm:p-8 printable-area overflow-y-auto">
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
                    {/* Watermark */}
                    <div 
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '-50px',
                            transform: 'rotate(-30deg)',
                            zIndex: 0,
                            color: 'rgba(74, 58, 48, 0.05)',
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                            textTransform: 'uppercase',
                        }}
                        className="font-serif"
                        aria-hidden="true"
                    >
                        PROSA E PONTEADO
                    </div>
                    
                    {/* Content Wrapper */}
                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-serif text-brand-primary">{title}</h1>
                        </div>

                        <div className="flex justify-between items-start mb-8 no-print">
                            <div>
                                <div className="flex items-center text-brand-primary">
                                    <MicrophoneLogoIcon className="h-8 w-8 text-brand-secondary" />
                                    <span className="ml-3 font-serif text-2xl">Prosa e Ponteado</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Documento Gerado pela Plataforma</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handlePrint} className="bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary transition-colors">Imprimir / Salvar PDF</button>
                                <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Fechar</button>
                            </div>
                        </div>

                        {/* Print Only Header */}
                        <div className="print-header mb-8">
                             <div className="flex items-center text-brand-primary">
                                <MicrophoneLogoIcon className="h-8 w-8 text-brand-secondary" />
                                <span className="ml-3 font-serif text-2xl">Prosa e Ponteado</span>
                            </div>
                             <p className="text-sm text-gray-500 mt-1">Documento Gerado pela Plataforma</p>
                        </div>
                        
                        <div 
                            className="prose max-w-none text-gray-800 text-justify"
                            dangerouslySetInnerHTML={{ 
                                __html: content
                                    .replace(/\n/g, '<br />')
                                    .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
                                    .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')
                                    .replace(/### (.*)/g, '<h4 class="text-lg font-semibold mt-4 text-brand-primary">$1</h4>')
                                    .replace(/## (.*)/g, '<h3 class="text-xl font-bold mt-6 mb-2 text-brand-primary">$1</h3>')
                                    .replace(/# (.*)/g, '<h2 class="text-2xl font-serif mt-8 mb-4 text-brand-primary">$1</h2>')
                            }} 
                        />

                        <div className="mt-12 pt-6 border-t border-gray-200">
                             <p className="text-sm text-yellow-800 bg-yellow-50 p-4 rounded-md border border-yellow-200">
                                <strong>Atenção:</strong> Este é um material de apoio da plataforma Prosa e Ponteado. Recomendamos a verificação de informações como datas e locais nos canais oficiais dos organizadores.
                            </p>
                        </div>

                        <footer className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
                            {disclaimer && <p className="mb-4 text-xs text-gray-500 italic">{disclaimer}</p>}
                            Gerado em {new Date().toLocaleDateString('pt-BR')} | &copy; Prosa e Ponteado
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintableView;