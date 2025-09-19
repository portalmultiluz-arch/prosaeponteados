import React from 'react';

type IconProps = { className?: string };

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 6.75 3 4.5 3C2.25 3 1.5 4.5 1.5 6.75C1.5 9 3 10.5 3 10.5C3 10.5 1.5 12 1.5 13.5C1.5 15.75 2.25 17.25 4.5 17.25C6.75 17.25 12 14.0028 12 14.0028" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 17.25 3 19.5 3C21.75 3 22.5 4.5 22.5 6.75C22.5 9 21 10.5 21 10.5C21 10.5 22.5 12 22.5 13.5C22.5 15.75 21.75 17.25 19.5 17.25C17.25 17.25 12 14.0028 12 14.0028" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21V14" />
    </svg>
);

export const MicrophoneLogoIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
    <path d="M12 15C14.2091 15 16 13.2091 16 11V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V11C8 13.2091 9.79086 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 19H15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19V22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const QuoteIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.981 18.915c0 1.341-1.076 2.42-2.413 2.42-1.339 0-2.415-1.079-2.415-2.42s1.076-2.42 2.415-2.42c.15 0 .296.013.438.038.312-.924.747-2.203 1.25-3.441.285-.697.52-1.383.682-2.022-.218.02-.438.032-.656.032-1.337 0-2.413-1.08-2.413-2.42 0-1.341 1.076-2.42 2.413-2.42 1.339 0 2.415 1.079 2.415 2.42 0 .159-.015.316-.043.471-.853 3.23-1.636 6.223-2.373 8.875.044.004.087.008.13.008.796 0 1.51-.318 2.031-.842.176.625.26.96.38 1.581-.45.42-.98.715-1.571.848zm10.015.002c0 1.341-1.076 2.42-2.413 2.42-1.339 0-2.415-1.079-2.415-2.42s1.076-2.42 2.415-2.42c.15 0 .296.013.438.038.312-.924.747-2.203 1.25-3.441.285-.697.52-1.383.682-2.022-.218.02-.438.032-.656.032-1.337 0-2.413-1.08-2.413-2.42 0-1.341 1.076-2.42 2.413-2.42 1.339 0 2.415 1.079 2.415 2.42 0 .159-.015.316-.043.471-.853 3.23-1.636 6.223-2.373 8.875.044.004.087.008.13.008.796 0 1.51-.318 2.031-.842.176.625.26.96.38 1.581-.45.42-.98.715-1.571.848z"/>
    </svg>
);


// Main Section Icons
export const ContentIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);

export const PeopleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const AdminIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


// Link Icons
export const CourseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.25278C12 6.25278 6.75 3 4.5 3C2.25 3 1.5 4.5 1.5 6.75C1.5 9 3 10.5 3 10.5M12 6.25278C12 6.25278 17.25 3 19.5 3C21.75 3 22.5 4.5 22.5 6.75C22.5 9 21 10.5 21 10.5M12 6.25278V21M3 10.5C3 10.5 1.5 12 1.5 13.5C1.5 15.75 2.25 17.25 4.5 17.25C6.75 17.25 12 21 12 21M21 10.5C21 10.5 22.5 12 22.5 13.5C22.5 15.75 21.75 17.25 19.5 17.25C17.25 17.25 12 21 12 21M3 10.5V17.25M21 10.5V17.25" /></svg>
);

export const ExerciseIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
);

export const SimulationIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

export const PodcastIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);

export const MusicIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
);

export const BulletinIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h.01M17 17h.01" /></svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export const ServiceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);

export const PartnershipIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" /></svg>
);

export const SubscriptionIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
);

export const FinanceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);

export const MediaIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const MessageIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);

export const GlobalIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8l2.293 2.293a1 1 0 11-1.414 1.414L3 8.828a1 1 0 010-1.656l3.293-3.293a1 1 0 011.414 0zM16.293 19.707a1 1 0 010-1.414L18.586 16l-2.293-2.293a1 1 0 111.414-1.414L21 15.172a1 1 0 010 1.656l-3.293 3.293a1 1 0 01-1.414 0z" /></svg>
);

export const TestIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-.547-1.806zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export const ManualIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.25278C12 6.25278 6.75 3 4.5 3C2.25 3 1.5 4.5 1.5 6.75C1.5 9 3 10.5 3 10.5M12 6.25278C12 6.25278 17.25 3 19.5 3C21.75 3 22.5 4.5 22.5 6.75C22.5 9 21 10.5 21 10.5M15 14l-3-3m0 0l-3 3m3-3v12" /></svg>
);

export const MaintenanceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
);

// New Thematic Icons for MainPage
export const BookOpenIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
export const CalendarIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 17.25h.008v.008H12v-.008z" /></svg>;
export const VideoCameraIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg>;
export const SparklesIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 15.75l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 20l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 23.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 20l1.035-.259a3.375 3.375 0 002.456-2.456L18 15.75z" /></svg>;
export const HeartIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
export const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
export const UsersIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12.75a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" /></svg>;


// Action Icons
export const DownloadIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
export const PlayIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>;
export const StopIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></svg>;
export const TrashIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;
export const ArrowUpIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>;
export const XIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
export const CheckIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>;
export const PencilIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
export const PlusIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>;
export const MailIcon: React.FC<IconProps> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;


// Social Icons
export const YoutubeIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 2.00037C6.47737 2.00037 2.00024 6.4775 2.00024 12.0004C2.00024 17.5232 6.47737 22.0004 12.0002 22.0004C17.5231 22.0004 22.0002 17.5232 22.0002 12.0004C22.0002 6.4775 17.5231 2.00037 12.0002 2.00037ZM9.8596 15.5684V8.43237L15.4281 12.0004L9.8596 15.5684Z"/></svg>;
export const TiktokIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 2.00037C6.47737 2.00037 2.00024 6.4775 2.00024 12.0004C2.00024 17.5232 6.47737 22.0004 12.0002 22.0004C17.5231 22.0004 22.0002 17.5232 22.0002 12.0004C22.0002 6.4775 17.5231 2.00037 12.0002 2.00037ZM17.1894 10.2709C17.1394 11.2393 16.822 12.1824 16.2731 12.9912C15.7242 13.8001 14.9664 14.4449 14.0805 14.8584V6.51782H16.4883V8.89297C16.8631 8.5293 17.3182 8.25203 17.8228 8.08252C18.3274 7.91301 18.8687 7.85522 19.3986 7.91301V10.165C18.7056 9.87207 17.9429 9.87207 17.1894 10.165V10.2709ZM8.01633 13.1979C8.36979 14.1663 9.00696 14.9751 9.83781 15.5398C10.6687 16.1044 11.652 16.4014 12.6568 16.3908V14.0156C12.0401 14.1215 11.4128 14.0156 10.8354 13.7186C10.258 13.4215 9.77996 12.9515 9.47641 12.3868L9.42644 12.2809V14.8584H7.01855V5.50098H9.42644V11.2393C9.37648 11.8039 9.20015 12.3579 8.90807 12.8693L8.01633 13.1979Z"/></svg>;
export const InstagramIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 2.00037C6.47737 2.00037 2.00024 6.4775 2.00024 12.0004C2.00024 17.5232 6.47737 22.0004 12.0002 22.0004C17.5231 22.0004 22.0002 17.5232 22.0002 12.0004C22.0002 6.4775 17.5231 2.00037 12.0002 2.00037ZM16.8921 12.0004C16.8921 14.6973 14.6969 16.8925 12.0001 16.8925C9.30325 16.8925 7.10803 14.6973 7.10803 12.0004C7.10803 9.30355 9.30325 7.10834 12.0001 7.10834C14.6969 7.10834 16.8921 9.30355 16.8921 12.0004ZM17.1813 8.35639C16.6359 8.35639 16.1915 7.91197 16.1915 7.36659C16.1915 6.8212 16.6359 6.37678 17.1813 6.37678C17.7267 6.37678 18.1711 6.8212 18.1711 7.36659C18.1711 7.91197 17.7267 8.35639 17.1813 8.35639ZM15.1132 12.0004C15.1132 13.7196 13.7194 15.1134 12.0001 15.1134C10.2808 15.1134 8.88708 13.7196 8.88708 12.0004C8.88708 10.2811 10.2808 8.88741 12.0001 8.88741C13.7194 8.88741 15.1132 10.2811 15.1132 12.0004Z"/></svg>;
export const LinkedInIcon: React.FC<IconProps> = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0002 2.00037C6.47737 2.00037 2.00024 6.4775 2.00024 12.0004C2.00024 17.5232 6.47737 22.0004 12.0002 22.0004C17.5231 22.0004 22.0002 17.5232 22.0002 12.0004C22.0002 6.4775 17.5231 2.00037 12.0002 2.00037ZM8.63103 17.369H6.13623V9.13379H8.63103V17.369ZM7.38363 8.11078C6.62121 8.11078 6.00024 7.48982 6.00024 6.72739C6.00024 5.96497 6.62121 5.344 7.38363 5.344C8.14606 5.344 8.76702 5.96497 8.76702 6.72739C8.76702 7.48982 8.14606 8.11078 7.38363 8.11078ZM18.0002 17.3693H15.5054V13.4355C15.5054 12.4493 15.4851 11.1914 14.1558 11.1914C12.8265 11.1914 12.6015 12.247 12.6015 13.3518V17.3693H10.1067V9.13379H12.4939V10.2078H12.5347C12.8623 9.5843 13.6826 8.94141 14.9922 8.94141C17.5844 8.94141 18.0002 10.6139 18.0002 12.924V17.3693Z"/></svg>;