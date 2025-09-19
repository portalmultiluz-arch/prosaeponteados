import type { DashboardSection, Plan, ScheduleEvent, SheetMusic, Product, Course, CulturalKnowledgeItem, EffectiveRemedyItem, DemystifyAIItem, PartnerItem, BulletinEvent, MainPageContent, AIToolContent, GeneratedImage, GeneratedPodcast } from './types';

export const dashboardSections: DashboardSection[] = [
  {
    title: 'Gestão da Página Principal',
    icon: 'content',
    links: [
      { name: 'Gerenciar Conteúdo da Página', icon: 'admin', id: 'manage-main-page-content' },
    ],
  },
  {
    title: 'Gestão de Conteúdo Cultural',
    icon: 'course',
    links: [
      { name: 'Controle de Cursos', icon: 'course', id: 'manage-courses' },
      { name: 'Gerenciamento de Exercícios', icon: 'exercise', id: 'manage-exercises' },
      { name: "Gerenciar 'Saber Cultural'", icon: 'music', id: 'manage-cultural-knowledge' },
      { name: "Gerenciar 'O Violeiro Virtual'", icon: 'music', id: 'manage-virtual-violeiro' },
      { name: 'Gerenciar Partituras (PDF)', icon: 'music', id: 'manage-sheet-music' },
      { name: 'Gerenciar Boletim de Eventos', icon: 'bulletin', id: 'manage-events-bulletin' },
      { name: 'Gerenciar Programação Mensal', icon: 'bulletin', id: 'manage-monthly-schedule' },
      { name: 'Gerenciar Cronograma Cultural', icon: 'bulletin', id: 'manage-cultural-schedule' },
      { name: 'Gerenciar Lives (YouTube)', icon: 'podcast', id: 'manage-youtube-lives' },
      { name: 'Gerenciar Link de Convidado (YouTube)', icon: 'partnership', id: 'manage-guest-link' },
      { name: "Gerenciar 'O Remédio Eficaz'", icon: 'test', id: 'manage-effective-remedy' },
      { name: "Gerenciar 'Desmistificação da IA'", icon: 'simulation', id: 'manage-demystify-ai' },
    ],
  },
  {
    title: 'Ferramentas de IA',
    icon: 'simulation',
    links: [
      { name: 'Gerenciar Conteúdo das Ferramentas', icon: 'admin', id: 'manage-ai-tools-content' },
      { name: 'Gerador de Imagens (Admin)', icon: 'image', id: 'manage-image-generator' },
      { name: 'Gerador de Podcast (Admin)', icon: 'podcast', id: 'manage-podcast-generator' },
    ],
  },
  {
    title: 'Administração e Sistema',
    icon: 'admin',
    links: [
      { name: 'Gerenciar Perfis de Usuários', icon: 'profile', id: 'manage-user-profiles' },
      { name: 'Controle de Produtos e Serviços', icon: 'service', id: 'manage-products-services' },
      { name: 'Gestão de Parceiros e Anunciantes', icon: 'partnership', id: 'manage-partners' },
      { name: 'Planos de Assinaturas', icon: 'subscription', id: 'manage-subscriptions' },
      { name: 'Controle Financeiro', icon: 'finance', id: 'financial-control' },
      { name: 'Gerenciamento de Mídia', icon: 'media', id: 'media-management' },
      { name: 'Mensagem do Sistema', icon: 'message', id: 'system-message' },
      { name: 'Plataforma Global', icon: 'global', id: 'global-platform' },
      { name: 'Validação e Testes', icon: 'test', id: 'validation-testing' },
      { name: 'Manual de Uso do Sistema', icon: 'manual', id: 'system-manual' },
      { name: 'Manutenção Técnica do Sistema', icon: 'maintenance', id: 'system-maintenance' },
    ],
  },
];

export const initialPlans: Plan[] = [
    { id: '1', name: 'Entusiasta Cultural', price: 'R$ 27,90/mês', features: ['Acesso a todos os cursos', 'Download de materiais (5/mês)', 'Suporte via comunidade'], color: 'bg-orange-200', textColor: 'text-orange-800' },
    { id: '2', name: 'Explorador Dedicado', price: 'R$ 47,90/mês', features: ['Tudo do plano Entusiasta', 'Download de materiais (20/mês)', 'Acesso a audiobooks exclusivos', 'Suporte prioritário via email'], popular: true, color: 'bg-gray-200', textColor: 'text-gray-800' },
    { id: '3', name: 'Mestre Violeiro', price: 'R$ 77,90/mês', features: ['Tudo do plano Explorador', 'Aulas ao vivo com especialistas', 'Downloads ilimitados', 'Acesso a todas as ferramentas de IA'], color: 'bg-yellow-200', textColor: 'text-yellow-800' },
    { id: '5', name: 'Plano Anual', price: 'R$ 779,00/ano', features: ['Plano Mestre Violeiro com desconto', 'Equivalente a R$ 64,91/mês', 'Economize R$ 155,80!'], color: 'bg-green-200', textColor: 'text-green-800' },
    { id: '4', name: 'Mentor', price: 'R$ 197,00/mês', features: ['Tudo do plano Mestre Violeiro', 'Mentoria individual mensal', 'Acesso antecipado a novos conteúdos'], color: 'bg-blue-200', textColor: 'text-blue-800' },
    { id: '6', name: 'Acesso Único', price: 'R$ 9,90', features: ['Acesso único a um recurso premium', 'Válido por 24 horas', 'Ideal para experimentar'], color: 'bg-purple-200', textColor: 'text-purple-800' },
];

const getNextTuesday = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + (2 + 7 - d.getDay()) % 7);
    return d.toISOString().split('T')[0];
};

export const initialScheduleEvents: ScheduleEvent[] = [
  { id: '1', title: 'Live com Tião Carreiro (IA)', type: 'Live', date: getNextTuesday(), time: '20:00', description: 'Uma conversa simulada com o mestre da viola, explorando sua vida e obra.' },
  { id: '2', title: 'Workshop de Culinária Mineira', type: 'Evento', date: '2024-08-15', time: '14:00', description: 'Aprenda a fazer o autêntico pão de queijo e outras delícias de Minas Gerais.' },
  { id: '3', title: 'Videoaula: Ritmos de Pagode de Viola', type: 'Videoaula', date: '2024-08-20', time: '10:00', description: 'Uma aula detalhada sobre os principais ritmos do pagode de viola.' },
  { id: '4', title: 'Evento do Parceiro: Roda de Viola', type: 'Parceiro', date: '2024-08-25', time: '19:00', description: 'Nosso parceiro "Viola & Cia" promove uma roda de viola aberta ao público.' },
];

export const initialSheetMusic: SheetMusic[] = [
    { id: '1', title: "Tristeza do Jeca", url: "#" },
    { id: '2', title: "O Menino da Porteira", url: "#" },
    { id: '3', title: "Chico Mineiro", url: "#" }
];

export const initialProducts: Product[] = [
    {
        id: '1',
        title: 'Curso Completo de Viola Caipira',
        type: 'Curso',
        tagline: 'Do zero ao ponteio avançado.',
        description: 'Aprenda todos os segredos da viola caipira com nosso curso online. Aulas em vídeo, material de apoio em PDF, e suporte direto com os instrutores. São mais de 50 aulas cobrindo afinações, ritmos, ponteios e repertório clássico.',
        imageUrl: 'https://images.pexels.com/photos/1816629/pexels-photo-1816629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example video
        price: 'A partir de R$ 39/mês',
    },
    {
        id: '2',
        title: 'E-book: Receitas da Cozinha Tropeira',
        type: 'E-book',
        tagline: 'Sabores que contam histórias.',
        description: 'Viaje no tempo com este e-book completo que resgata as receitas autênticas da cozinha tropeira. Aprenda a fazer pratos como o Feijão Tropeiro, a Paçoca de Carne Seca e o Arroz Carreteiro, com dicas e histórias sobre a origem de cada um.',
        imageUrl: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 'R$ 29,90 (Pagamento Único)',
    },
    {
        id: '3',
        title: 'Mentoria Cultural Personalizada',
        type: 'Serviço',
        tagline: 'Um guia exclusivo para seus estudos.',
        description: 'Tenha um especialista em cultura brasileira para guiar seus estudos. Ideal para pesquisadores, músicos e artistas que buscam um aprofundamento direcionado. Sessões online individuais para tirar dúvidas, analisar repertório e criar um plano de desenvolvimento artístico.',
        imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 'Consulte-nos',
    }
];

export const initialCourses: Course[] = [
    {
        id: '1',
        title: 'Ritmos do Brasil na Viola',
        tagline: 'Explore a diversidade rítmica do país, do Catira ao Baião.',
        description: 'Uma jornada profunda pelos ritmos que formam a música brasileira, adaptados para a viola caipira. Este curso aborda desde as batidas tradicionais do Cururu e do Catira até a complexidade do Baião e do Maracatu, com aulas práticas e teóricas.',
        instructor: 'Tiago Violeiro',
        duration: '8 Horas',
        imageUrl: 'https://images.pexels.com/photos/3757005/pexels-photo-3757005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/G1IbRaa_uDk',
        price: 'R$ 49,90 (Acesso Vitalício)',
        modules: [
            { title: 'Módulo 1: Fundamentos Rítmicos', lessons: ['Introdução à Métrica', 'Pagode de Viola', 'Querumana'] },
            { title: 'Módulo 2: Ritmos do Sudeste', lessons: ['Catira e Cateretê', 'Cururu', 'Moda de Viola'] },
            { title: 'Módulo 3: Ritmos do Nordeste', lessons: ['Baião na Viola', 'Xote e Xaxado', 'Maracatu (Adaptação)'] }
        ]
    },
    {
        id: '2',
        title: 'História da Arte Sacra Mineira',
        tagline: 'Uma palestra sobre o Barroco de Aleijadinho e Mestre Ataíde.',
        description: 'Esta palestra em vídeo, gravada em alta definição, transporta você para o coração do Barroco Mineiro. O historiador de arte Dr. Carlos Drummond analisa as obras de Aleijadinho e Mestre Ataíde, explorando o contexto histórico, as técnicas e o simbolismo por trás da arte sacra que floresceu em Minas Gerais no século XVIII.',
        instructor: 'Dr. Carlos Drummond',
        duration: '1.5 Horas',
        imageUrl: 'https://images.pexels.com/photos/19614481/pexels-photo-19614481/free-photo-of-church-of-sao-francisco-de-assis-in-ouro-preto-brazil.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/I0No19ksD4s',
        price: 'R$ 29,90 (Acesso Vitalício)',
        modules: [
            { title: 'Parte 1: O Contexto do Ciclo do Ouro', lessons: ['A Sociedade Mineira', 'A Igreja como Centro da Vida Social'] },
            { title: 'Parte 2: Aleijadinho, o Arquiteto e Escultor', lessons: ['Análise dos Profetas de Congonhas', 'As Igrejas de Ouro Preto'] },
            { title: 'Parte 3: Mestre Ataíde e a Pintura Barroca', lessons: ['A Perspectiva Ilusionista', 'O Simbolismo das Cores'] }
        ]
    },
    {
        id: '3',
        title: 'Modernismo Brasileiro: Uma Revolução na Arte',
        tagline: 'De Oswald de Andrade a Tarsila do Amaral, entenda o movimento que redefiniu o Brasil.',
        description: 'Este curso explora as origens, os manifestos e os principais artistas do Modernismo Brasileiro. Analisaremos obras literárias e visuais que buscaram criar uma identidade cultural autenticamente nacional, rompendo com os padrões europeus. Ideal para estudantes, vestibulandos e todos os apaixonados por arte e história.',
        instructor: 'Prof.ª Dr.ª Ana Lúcia',
        duration: '6 Horas',
        imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/s_F4-iYv_4s',
        price: 'R$ 49,90 (Acesso Vitalício)',
        modules: [
            { title: 'Módulo 1: Antecedentes e a Semana de 22', lessons: ['O Contexto Histórico', 'A Semana de Arte Moderna', 'Manifesto Antropofágico'] },
            { title: 'Módulo 2: A Prosa Modernista', lessons: ['Mário de Andrade: Macunaíma', 'Oswald de Andrade: Serafim Ponte Grande', 'A Geração de 30'] },
            { title: 'Módulo 3: A Poesia e as Artes Visuais', lessons: ['Manuel Bandeira e a Liberdade Poética', 'Tarsila do Amaral e o Abaporu', 'O Legado do Modernismo'] }
        ]
    }
];

export const initialCulturalKnowledge: CulturalKnowledgeItem[] = [
    {
        id: '1',
        type: 'Artigo',
        title: 'A Influência Africana na Culinária Baiana',
        tagline: 'Sabores que contam a história de um povo.',
        description: 'A culinária baiana é um dos mais ricos exemplos da fusão cultural brasileira. A base de sua identidade está profundamente enraizada nas tradições africanas, trazidas pelos escravizados durante o período colonial. Ingredientes como o azeite de dendê, o leite de coco, a pimenta e o quiabo são heranças diretas que se tornaram pilares de pratos emblemáticos. O acarajé, por exemplo, não é apenas um alimento, mas um símbolo religioso do candomblé, mostrando a indissociável ligação entre comida e espiritualidade.',
        imageUrl: 'https://images.pexels.com/photos/4049878/pexels-photo-4049878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        id: '2',
        type: 'Vídeo',
        title: 'Documentário: A Arte do Ponteio na Viola',
        tagline: 'Os segredos da técnica que dá alma à música caipira.',
        description: 'Neste vídeo de 25 minutos, mergulhamos no coração da música de raiz brasileira para desvendar a arte do ponteio. Entrevistamos violeiros experientes que compartilham suas histórias, técnicas e a paixão pelo instrumento. As câmeras capturam em detalhes o movimento ágil dos dedos sobre as cordas, enquanto a trilha sonora apresenta exemplos clássicos de ponteios que marcaram gerações.',
        imageUrl: 'https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/G1IbRaa_uDk',
    },
    {
        id: '3',
        type: 'Material',
        title: 'Guia de Festas Populares Brasileiras',
        tagline: 'Um calendário completo para celebrar o Brasil.',
        description: 'Este e-book de 40 páginas é um convite para viajar pelo Brasil através de suas celebrações. Organizamos um calendário anual com as festas mais importantes de cada região, detalhando suas origens, rituais e significados culturais. O material é ricamente ilustrado com fotos e infográficos, tornando a leitura uma experiência visualmente agradável e informativa.',
        imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
];

export const initialEffectiveRemedy: EffectiveRemedyItem[] = [
    {
        id: '1',
        title: 'A Arte como Terapia',
        description: 'A música, a pintura e a dança têm o poder de curar a alma, reduzir o estresse e promover o bem-estar. Explore estudos e depoimentos que comprovam o poder terapêutico da arte em nossas vidas.',
        imageUrl: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_86-2-K1_5i1g2vjbv2_D7nFSRo2mD1f',
        textUrl: '#',
    }
];

export const initialDemystifyAI: DemystifyAIItem[] = [
    {
        id: '1',
        title: 'IA: Sua Aliada na Criatividade',
        description: 'A Inteligência Artificial não está aqui para substituir o artista, mas para expandir suas ferramentas. Veja como a IA pode ajudar na composição musical, na criação de roteiros e na geração de arte visual, abrindo novas fronteiras para a expressão cultural.',
        imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_86-2-K1_5i1g2vjbv2_D7nFSRo2mD1f',
        textUrl: '#',
    }
];

export const initialPartners: PartnerItem[] = [
    {
        id: '1',
        title: 'Viola & Cia',
        description: 'A maior loja de instrumentos de corda da região, apoiando a música de raiz e os novos talentos. Oferecem descontos especiais para os membros do Prosa e Ponteado.',
        imageUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_86-2-K1_5i1g2vjbv2_D7nFSRo2mD1f',
        textUrl: 'https://www.linkedin.com/in/hitz-ponteio-401199230/',
    }
];

export const initialBulletinEvents: BulletinEvent[] = [
    {
        id: '1',
        title: 'Festa de Nossa Senhora do Rosário (Congada), Catalão, GO',
        date: '2024-10-28',
        organizer: 'Irmandade de N. S. do Rosário',
        description: 'Celebração afro-brasileira com Ternos de Congo, Moçambique e Catupés, dançando e cantando em louvor à santa, uma tradição de mais de 140 anos.'
    },
    {
        id: '2',
        title: 'Festival Internacional de Cinema do Rio (Festival do Rio)',
        date: '2024-11-15',
        organizer: 'Cinema do Rio',
        description: 'Um dos mais importantes festivais de cinema da América Latina, apresentando uma seleção de filmes de todo o mundo, com premieres e debates.'
    },
    {
        id: '10',
        title: 'CCXP - Comic Con Experience, São Paulo, SP',
        date: '2024-12-05',
        organizer: 'Omelete Company',
        description: 'O maior festival de cultura pop do mundo, com painéis de cinema, TV, quadrinhos e um "Artists\' Valley" repleto de talentos nacionais.'
    },
    {
        id: '3',
        title: 'Mostra de Cinema de Tiradentes, MG',
        date: '2025-01-24',
        organizer: 'Universo Produção',
        description: 'Principal vitrine do cinema brasileiro contemporâneo, exibindo longas e curtas gratuitamente, promovendo debates e encontros entre cineastas e o público.'
    },
    {
        id: '4',
        title: 'Carnaval de Olinda, PE',
        date: '2025-03-01',
        organizer: 'Prefeitura de Olinda',
        description: 'Famoso por seus bonecos gigantes, blocos de frevo e maracatu que tomam as ladeiras históricas da cidade, é um dos carnavais mais autênticos do Brasil.'
    },
    {
        id: '11',
        title: 'Virada Cultural, São Paulo, SP',
        date: '2025-05-17',
        organizer: 'Prefeitura de São Paulo',
        description: '24 horas ininterruptas de eventos culturais espalhados pela cidade, incluindo shows de grandes nomes da música brasileira, peças de teatro, dança e muito mais.'
    },
    {
        id: '5',
        title: 'Festival Folclórico de Parintins, AM',
        date: '2025-06-27',
        organizer: 'Bois-Bumbás Garantido e Caprichoso',
        description: 'A disputa entre os bois Garantido (vermelho) e Caprichoso (azul) em uma ópera a céu aberto que celebra as lendas e a cultura da Amazônia.'
    },
    {
        id: '7',
        title: 'Festa Literária Internacional de Paraty (FLIP), RJ',
        date: '2025-07-09',
        organizer: 'Associação Casa Azul',
        description: 'Um dos principais festivais literários do mundo, reunindo grandes nomes da literatura nacional e internacional em debates, leituras e lançamentos.'
    },
    {
        id: '6',
        title: 'Festival de Dança de Joinville, SC',
        date: '2025-07-15',
        organizer: 'Instituto Festival de Dança',
        description: 'Considerado o maior festival de dança do mundo. Reúne milhares de bailarinos de diversos estilos, do balé clássico às danças urbanas.'
    },
    {
        id: '12',
        title: 'Oktoberfest, Blumenau, SC',
        date: '2025-10-08',
        organizer: 'Prefeitura de Blumenau',
        description: 'A maior festa alemã das Américas, com desfiles, música, dança folclórica e, claro, muita cerveja e gastronomia típica.'
    },
    {
        id: '13',
        title: 'Círio de Nazaré, Belém, PA',
        date: '2025-10-12',
        organizer: 'Arquidiocese de Belém',
        description: 'Uma das maiores manifestações religiosas do mundo, a procissão reúne milhões de fiéis em uma demonstração de fé e cultura paraense.'
    }
];

export const initialMainPageContent: MainPageContent = {
    coverImageUrl: 'https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    aboutUsImageUrl: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    aboutUsText1: 'O "Prosa e Ponteado" nasce do desejo de criar um espaço vibrante e acessível para todos que desejam explorar, aprender e se conectar com a riqueza da cultura brasileira.',
    aboutUsText2: 'Utilizamos a tecnologia como ponte, incluindo a inteligência artificial do "Saber para Todos", para oferecer uma experiência única e imersiva. Nossa missão é preservar e difundir as tradições, a música, a arte e as histórias que formam a identidade do nosso país.',
    dailyMessageText: '"A cultura é o melhor conforto para a velhice."',
    dailyMessageAuthor: 'ARISTÓTELES',
    testimonials: [
        { id: '1', text: 'Uma plataforma incrível! Aprendi mais sobre a cultura do meu país em um mês do que em anos.', author: 'Usuário Satisfeito 1' },
        { id: '2', text: 'O Violeiro Virtual é uma ferramenta fantástica para praticar. Recomendo a todos!', author: 'Músico Amador' },
        { id: '3', text: 'Os cursos são de altíssima qualidade. Conteúdo rico e bem explicado.', author: 'Estudante de História' },
    ],
    contactEmail: 'prosaeponteado@gmail.com',
};

export const initialAIToolsContent: AIToolContent[] = [
  {
    id: 'violeiro-virtual',
    title: 'O Violeiro Virtual',
    description: 'Seu assistente de IA para desvendar os segredos da viola caipira. Explore acordes, campos harmônicos e acesse nosso acervo de partituras.',
    imageUrl: 'https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://www.youtube.com/embed/G1IbRaa_uDk',
    textUrl: '#'
  },
  {
    id: 'course-structure-generator',
    title: 'Gerador de Estrutura de Curso',
    description: 'Insira um tópico e nossa IA irá gerar uma estrutura de curso completa para você, com módulos, tópicos e exercícios práticos.',
    imageUrl: 'https://images.pexels.com/photos/3757005/pexels-photo-3757005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://www.youtube.com/embed/s_F4-iYv_4s',
    textUrl: '#'
  },
  {
    id: 'study-plan-generator',
    title: 'Gerador de Plano de Estudo',
    description: 'Crie um cronograma de estudos personalizado com a ajuda da IA para organizar sua rotina e otimizar seu aprendizado.',
    imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    textUrl: '#'
  },
  {
    id: 'learn-with-ai',
    title: 'Aprenda com a IA',
    description: 'Explore tópicos culturais complexos através de diálogos e explicações geradas por nossa Inteligência Artificial. Uma nova forma de aprender.',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: '#',
    textUrl: '#'
  },
  {
    id: 'image-generator',
    title: 'Gerador de Imagens (IA)',
    description: 'Transforme suas ideias em imagens. Descreva uma cena, um conceito ou um estilo e nossa IA irá gerar uma imagem única para você.',
    imageUrl: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: '#',
    textUrl: '#'
  },
  {
    id: 'podcast-generator',
    title: 'Gerador de Podcast e Conteúdo',
    description: 'Crie roteiros para vídeos, podcasts e posts em redes sociais. Defina o tema, o tom e as vozes, e a IA monta o conteúdo para você.',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    videoUrl: '#',
    textUrl: '#'
  }
];

export const initialGeneratedImages: GeneratedImage[] = [];
export const initialGeneratedPodcasts: GeneratedPodcast[] = [];
