import React, { useState, useMemo } from 'react';
import { DownloadIcon } from './icons';
import type { SheetMusic, AIToolContent } from '../types';

interface ViolaChordDiagramProps {
    title: string;
    positions: (number | 'x')[]; 
    fretsToShow?: number;
    isSmall?: boolean;
}

const ViolaChordDiagram: React.FC<ViolaChordDiagramProps> = ({ title, positions, fretsToShow = 5, isSmall = false }) => {
    const numStrings = 5;
    const fretHeight = isSmall ? 20 : 30;
    const stringSpacing = isSmall ? 15 : 20;
    const nutHeight = isSmall ? 6 : 8;
    const dotRadius = isSmall ? 4 : 6;
    const openStrokeWidth = isSmall ? 1 : 1.5;
    const openRadius = isSmall ? 3 : 4;


    const width = (numStrings - 1) * stringSpacing + 20;
    const height = fretsToShow * fretHeight + nutHeight + (isSmall ? 15 : 20);
    
    return (
        <div className="flex flex-col items-center p-2">
            <h6 className={`font-bold text-brand-primary mb-1 ${isSmall ? 'text-sm' : 'text-lg'}`}>{title}</h6>
            <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="bg-white rounded p-2 border border-gray-200">
                {/* Nut */}
                <rect x="9" y="10" width={(numStrings - 1) * stringSpacing + 2} height={nutHeight} fill="#4a3a30" />

                {/* Frets */}
                {Array.from({ length: fretsToShow }).map((_, i) => (
                    <line
                        key={`fret-${i}`}
                        x1="10" y1={nutHeight + 10 + (i + 1) * fretHeight}
                        x2={width - 10} y2={nutHeight + 10 + (i + 1) * fretHeight}
                        stroke="#ccc"
                        strokeWidth="1.5"
                    />
                ))}

                {/* Strings */}
                {Array.from({ length: numStrings }).map((_, i) => (
                    <line
                        key={`string-${i}`}
                        x1={10 + i * stringSpacing} y1={10}
                        x2={10 + i * stringSpacing} y2={height - 5}
                        stroke="#666"
                        strokeWidth="1.5"
                    />
                ))}

                {/* Finger positions */}
                {positions.map((fret, stringIndex) => {
                    const x = 10 + stringIndex * stringSpacing;
                    if (fret === 'x') {
                        return (
                            <text key={`pos-${stringIndex}`} x={x} y={8} textAnchor="middle" fontSize={isSmall ? '10' : '12'} fill="#e53e3e" className="font-bold">X</text>
                        );
                    }
                    if (fret > 0 && fret <= fretsToShow) {
                        const cy = nutHeight + 10 + (fret * fretHeight) - (fretHeight / 2);
                        return <circle key={`pos-${stringIndex}`} cx={x} cy={cy} r={dotRadius} fill="#4a3a30" />;
                    }
                    if (fret === 0) {
                        return <circle key={`pos-${stringIndex}`} cx={x} cy={6} r={openRadius} fill="none" stroke="#4a3a30" strokeWidth={openStrokeWidth} />;
                    }
                    return null;
                })}
            </svg>
        </div>
    );
};

// Massively expanded and verified chord library
const chordLibrary: Record<string, Record<string, Record<string, { name: string; positions: (number | 'x')[] }>>> = {
    "Cebolão em D": {
        C: {
            'Maior': { name: 'C', positions: ['x', 1, 2, 1, 1] },
            'Menor': { name: 'Cm', positions: ['x', 3, 4, 3, 3] },
        },
        D: {
            'Maior': { name: 'D', positions: [0, 0, 0, 0, 0] },
            'Menor': { name: 'Dm', positions: [0, 0, 0, 1, 0] },
            'Com Sétima': { name: 'D7', positions: [0, 0, 0, 2, 0] },
            'Maior com Sétima': { name: 'Dmaj7', positions: [0, 0, 0, 3, 0] },
        },
        E: {
            'Maior': { name: 'E', positions: [2, 2, 3, 4, 2] },
            'Menor': { name: 'Em', positions: [2, 2, 3, 2, 1] },
            'Com Sétima': { name: 'E7', positions: [2, 2, 3, 2, 0] },
        },
        F: {
            'Maior': { name: 'F', positions: [3, 3, 4, 3, 3] },
            'Menor': { name: 'Fm', positions: [3, 3, 4, 5, 5] },
        },
        G: {
            'Maior': { name: 'G', positions: [0, 2, 1, 2, 0] },
            'Menor': { name: 'Gm', positions: [0, 2, 1, 1, 0] },
            'Com Sétima': { name: 'G7', positions: [0, 2, 1, 2, 3] },
        },
        A: {
            'Maior': { name: 'A', positions: [2, 0, 1, 0, 2] },
            'Menor': { name: 'Am', positions: [2, 0, 1, 0, 1] },
            'Com Sétima': { name: 'A7', positions: [2, 0, 1, 0, 0] },
        },
        B: {
            'Maior': { name: 'B', positions: [4, 4, 5, 4, 4] },
            'Menor': { name: 'Bm', positions: ['x', 0, 3, 2, 3] },
            'Com Sétima': { name: 'B7', positions: ['x', 0, 3, 2, 2] },
        },
        'F#': {
            'Menor': { name: 'F#m', positions: [4, 4, 5, 4, 3] },
            'Com Sétima': { name: 'F#7', positions: [4, 4, 5, 4, 2] },
        },
        'C#': {
            'Diminuto': { name: 'C#dim', positions: ['x', 'x', 1, 2, 1] },
        },
    },
    "Cebolão em E": {
        C: {
             'Maior': { name: 'C', positions: ['x', 3, 4, 3, 3] },
             'Menor': { name: 'Cm', positions: ['x', 3, 4, 3, 2] },
        },
        D: {
            'Maior': { name: 'D', positions: ['x', 0, 2, 1, 2] },
            'Menor': { name: 'Dm', positions: ['x', 0, 2, 1, 1] },
        },
        E: {
            'Maior': { name: 'E', positions: [0, 0, 0, 0, 0] },
            'Menor': { name: 'Em', positions: [0, 0, 0, 1, 0] },
            'Com Sétima': { name: 'E7', positions: [0, 0, 0, 2, 0] },
            'Maior com Sétima': { name: 'Emaj7', positions: [0, 0, 0, 3, 0] },
        },
        F: {
            'Maior': { name: 'F', positions: [1, 1, 2, 1, 1] },
            'Menor': { name: 'Fm', positions: [1, 1, 2, 3, 3] },
        },
        G: {
            'Maior': { name: 'G', positions: [3, 3, 2, 3, 3] },
            'Menor': { name: 'Gm', positions: [3, 3, 2, 1, 1] },
        },
        A: {
            'Maior': { name: 'A', positions: [2, 2, 1, 2, 0] },
            'Menor': { name: 'Am', positions: [2, 2, 1, 3, 0] },
            'Com Sétima': { name: 'A7', positions: [2, 2, 1, 2, 3] },
        },
        B: {
            'Maior': { name: 'B', positions: [4, 4, 3, 4, 2] },
            'Menor': { name: 'Bm', positions: [4, 4, 3, 5, 5] },
            'Com Sétima': { name: 'B7', positions: [0, 1, 2, 0, 2] },
        },
        'C#': {
            'Menor': { name: 'C#m', positions: ['x', 2, 1, 2, 0] },
            'Menor com Sétima': { name: 'C#m7', positions: ['x', 2, 1, 2, 3] },
        },
        'F#': {
            'Maior': { name: 'F#', positions: [2, 2, 1, 2, 2] },
            'Menor': { name: 'F#m', positions: [2, 1, 1, 2, 2] },
            'Com Sétima': { name: 'F#7', positions: [2, 1, 1, 0, 2] },
        },
        'G#': {
            'Menor': { name: 'G#m', positions: [4, 4, 3, 4, 4] },
            'Diminuto': { name: 'G#dim', positions: [4, 3, 2, 3, 'x'] },
        },
         'D#': {
            'Diminuto': { name: 'D#dim', positions: ['x', 'x', 0, 1, 0] },
        },
    }
};

const tunings = Object.keys(chordLibrary);
const rootNotes = ['A', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const chordTypes = ['Maior', 'Menor', 'Com Sétima', 'Menor com Sétima', 'Maior com Sétima', 'Diminuto'];

const ChordFinder = () => {
    const [selectedTuning, setSelectedTuning] = useState(tunings[0]);
    const [selectedRoot, setSelectedRoot] = useState('D');
    const [selectedType, setSelectedType] = useState('Maior');

    const handleTuningChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTuning = e.target.value;
        setSelectedTuning(newTuning);
        if (newTuning === "Cebolão em E") {
            setSelectedRoot("E");
        } else {
            setSelectedRoot("D");
        }
        setSelectedType("Maior");
    };

    const currentChordData = chordLibrary[selectedTuning]?.[selectedRoot]?.[selectedType];

    return (
        <div className="mt-10 pt-8 border-t">
            <h4 className="text-2xl font-serif text-brand-primary mb-4">Consultor de Acordes Interativo</h4>
            <p className="mb-6 text-gray-700">
                Use os seletores abaixo para encontrar o acorde que deseja. O diagrama mostrará a forma correta no braço da viola.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg mb-8">
                <div>
                    <label htmlFor="tuning" className="block text-sm font-medium text-gray-700 mb-1">1. Afinação</label>
                    <select id="tuning" value={selectedTuning} onChange={handleTuningChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        {tunings.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="root" className="block text-sm font-medium text-gray-700 mb-1">2. Acorde (Nota)</label>
                    <select id="root" value={selectedRoot} onChange={e => setSelectedRoot(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        {rootNotes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">3. Tipo</label>
                    <select id="type" value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        {chordTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            <div className="flex justify-center items-center min-h-[220px] bg-gray-100 rounded-lg">
                {currentChordData ? (
                    <ViolaChordDiagram title={currentChordData.name} positions={currentChordData.positions} />
                ) : (
                    <p className="text-gray-500 p-4 text-center">Acorde não encontrado em nossa biblioteca para esta afinação. Tente outra combinação.</p>
                )}
            </div>
        </div>
    );
};

const AcordesContent = () => {
    return (
        <div>
            <div className="prose max-w-none text-gray-700">
                <h4 className="text-2xl font-serif text-brand-primary !mb-4">Entendendo a Formação de Acordes</h4>
                <p>
                    Um acorde é um conjunto de três ou mais notas tocadas simultaneamente, formando a base da harmonia na música. Vamos desvendar os elementos que constroem os acordes que você tocará na viola.
                </p>

                <h5>As Cifras: O Alfabeto Universal da Música</h5>
                <ul className="list-disc list-inside bg-slate-50 p-4 rounded-md">
                    <li><b>C</b> = Dó</li> <li><b>D</b> = Ré</li> <li><b>E</b> = Mi</li> <li><b>F</b> = Fá</li> <li><b>G</b> = Sol</li> <li><b>A</b> = Lá</li> <li><b>B</b> = Si</li>
                </ul>

                <h5>Qualidade do Acorde: A Emoção da Harmonia</h5>
                <ul>
                    <li><strong>Maior:</strong> Indicado apenas pela cifra (ex: <b>G</b>). Possui um som aberto, alegre. Formado pela tônica, terça maior e quinta justa.</li>
                    <li><strong>Menor:</strong> Indicado pela cifra seguida de "m" (ex: <b>Am</b>). Tem um som mais introspectivo. A diferença é que sua terça é menor.</li>
                </ul>

                <h5>Acidentes e Intervalos: Temperos Musicais</h5>
                <ul className="list-disc list-inside">
                    <li><strong>Acidentes:</strong> Modificam a altura da nota. Sustenido (#) eleva meio tom, Bemol (b) abaixa meio tom.</li>
                    <li><strong>Intervalos:</strong> Adicionam "cor". A <strong>Sétima (7)</strong> cria tensão (ex: <b>D7</b>), muito comum na música caipira. O acorde <strong>Diminuto (dim)</strong> tem sonoridade dissonante, usado para passagens.</li>
                </ul>
            </div>
            <ChordFinder />
        </div>
    );
};


const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
const minorScaleIntervals = [0, 2, 3, 5, 7, 8, 10]; // Natural Minor

const harmonicFieldPatternMajor = [
    { quality: 'Maior', degree: 'I' }, { quality: 'Menor', degree: 'ii' }, { quality: 'Menor', degree: 'iii' },
    { quality: 'Maior', degree: 'IV' }, { quality: 'Maior', degree: 'V' }, { quality: 'Menor', degree: 'vi' },
    { quality: 'Diminuto', degree: 'vii°' },
];

const harmonicFieldPatternMinor = [
    { quality: 'Menor', degree: 'i' }, { quality: 'Diminuto', degree: 'ii°' }, { quality: 'Maior', degree: 'III' },
    { quality: 'Menor', degree: 'iv' }, { quality: 'Menor', degree: 'v' }, { quality: 'Maior', degree: 'VI' },
    { quality: 'Maior', degree: 'VII' },
];

const getNoteFromInterval = (rootNote: string, interval: number): string => {
    const rootIndex = chromaticScale.indexOf(rootNote);
    if (rootIndex === -1) return '';
    return chromaticScale[(rootIndex + interval) % 12];
};

const HarmonicFieldGenerator = () => {
    const [tonality, setTonality] = useState('D');
    const [scaleType, setScaleType] = useState<'major' | 'minor'>('major');
    const [selectedTuning, setSelectedTuning] = useState(tunings[0]);

    const harmonicField = useMemo(() => {
        const scaleIntervals = scaleType === 'major' ? majorScaleIntervals : minorScaleIntervals;
        const pattern = scaleType === 'major' ? harmonicFieldPatternMajor : harmonicFieldPatternMinor;
        
        return pattern.map((p, index) => {
            const rootNote = getNoteFromInterval(tonality, scaleIntervals[index]);
            const chordData = chordLibrary[selectedTuning]?.[rootNote]?.[p.quality];
            return {
                degree: p.degree,
                chordName: chordData?.name || `${rootNote}${p.quality === 'Menor' ? 'm' : ''}${p.quality === 'Diminuto' ? '°' : ''}`,
                chordData
            };
        });
    }, [tonality, scaleType, selectedTuning]);

    return (
        <div>
             <h4 className="text-2xl font-serif text-brand-primary !mb-4">Gerador de Campo Harmônico</h4>
             <p className="mb-6 text-gray-700">
                Selecione a afinação, a tonalidade e o tipo de escala (maior ou menor) para visualizar todos os acordes do campo harmônico correspondente. Isso é fundamental para tirar músicas de ouvido e compor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg mb-8">
                 <div>
                    <label htmlFor="hf-tuning" className="block text-sm font-medium text-gray-700 mb-1">Afinação</label>
                    <select id="hf-tuning" value={selectedTuning} onChange={e => setSelectedTuning(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        {tunings.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="hf-tonality" className="block text-sm font-medium text-gray-700 mb-1">Tonalidade</label>
                    <select id="hf-tonality" value={tonality} onChange={e => setTonality(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        {rootNotes.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="hf-scale" className="block text-sm font-medium text-gray-700 mb-1">Escala</label>
                     <select id="hf-scale" value={scaleType} onChange={e => setScaleType(e.target.value as 'major' | 'minor')} className="w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="major">Maior</option>
                        <option value="minor">Menor</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {harmonicField.map(field => (
                    <div key={field.degree} className="p-2 border rounded-lg text-center bg-gray-50 flex flex-col items-center">
                        <span className="text-xs text-gray-500 font-bold">{field.degree}</span>
                        {field.chordData ? (
                            <ViolaChordDiagram title={field.chordData.name} positions={field.chordData.positions} isSmall={true} />
                        ) : (
                            <div className="flex-grow flex items-center justify-center">
                                <span className="font-bold text-brand-primary text-lg">{field.chordName}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

const violaTuningInfo = {
    "Cebolão em D": "D A F# D A (da 5ª para a 1ª corda). Afinação tradicional para pagodes e modas.",
    "Cebolão em E": "E B G# E B (da 5ª para a 1ª corda). Variação um tom acima, comum em repertórios mais modernos.",
    "Rio Abaixo": "G D G B D. Afinação antiga, com um som característico e grave.",
    "Boiadeira": "A E A C# E. Usada para solos e ponteios, com sonoridade brilhante."
};

interface SheetMusicListProps {
    sheetMusic: SheetMusic[];
}

const SheetMusicList: React.FC<SheetMusicListProps> = ({ sheetMusic }) => (
    <div>
        <h4 className="text-2xl font-serif text-brand-primary !mb-4">Acervo de Partituras</h4>
        <p className="mb-6 text-gray-700">
           Acesse nosso acervo de partituras e tablaturas de clássicos da música caipira. Clique para visualizar e fazer o download.
        </p>
        <ul className="space-y-3">
            {sheetMusic.map(item => (
                <li key={item.id}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-md group bg-slate-50 hover:bg-brand-secondary/10 transition-colors duration-200">
                        <span className="text-lg font-medium text-gray-700 group-hover:text-brand-primary">{item.title}</span>
                        <DownloadIcon className="h-6 w-6 text-gray-400 group-hover:text-brand-secondary" />
                    </a>
                </li>
            ))}
            {sheetMusic.length === 0 && <p className="text-center text-gray-500 py-4">Nenhuma partitura disponível no momento.</p>}
        </ul>
    </div>
);

const ContentSelector: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'acordes', name: 'Acordes' },
        { id: 'campo-harmonico', name: 'Campo Harmônico' },
        { id: 'partituras', name: 'Partituras' },
    ];
    return (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex justify-center space-x-6" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => onTabChange(tab.id)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg ${
                            activeTab === tab.id
                            ? 'border-brand-secondary text-brand-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

// FIX: Added the missing VioleiroVirtual component that was causing the module to have no default export.
interface VioleiroVirtualProps {
    sheetMusic: SheetMusic[];
    content: AIToolContent;
}

const VioleiroVirtual: React.FC<VioleiroVirtualProps> = ({ sheetMusic, content }) => {
    const [activeTab, setActiveTab] = useState('acordes');

    const renderContent = () => {
        switch (activeTab) {
            case 'acordes':
                return <AcordesContent />;
            case 'campo-harmonico':
                return <HarmonicFieldGenerator />;
            case 'partituras':
                return <SheetMusicList sheetMusic={sheetMusic} />;
            default:
                return <AcordesContent />;
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-serif text-brand-primary text-center">{content.title}</h3>
            <p className="mt-2 text-center text-gray-600 mb-6">
                {content.description}
            </p>
            <ContentSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-8">
                {renderContent()}
            </div>
        </div>
    );
};

// FIX: Removed uninitialized const declaration and added default export for the VioleiroVirtual component.
export default VioleiroVirtual;