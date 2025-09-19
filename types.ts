export type IconName = 
  'content' | 'people' | 'admin' | 'support' |
  'course' | 'exercise' | 'simulation' | 'image' | 'podcast' | 'music' |
  'bulletin' | 'service' | 'partnership' | 'subscription' | 'finance' |
  'media' | 'message' | 'global' | 'test' | 'profile' | 'manual' |
  'maintenance';

export interface DashboardLink {
  name: string;
  icon: IconName;
  id: string;
}

export interface DashboardSection {
  title: string;
  icon: IconName;
  links: DashboardLink[];
}

export type SubscriptionPlan = 'free' | 'bronze' | 'prata' | 'ouro' | 'premium';

export interface SheetMusic {
  id: string;
  title: string;
  url: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  type: 'Live' | 'Evento' | 'Videoaula' | 'Parceiro';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  description: string;
}

export interface CulturalKnowledgeItem {
  id: string;
  type: 'Artigo' | 'Vídeo' | 'Material';
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  color: string;
  textColor: string;
}

export interface Product {
  id: string;
  title: string;
  type: 'Curso' | 'Serviço' | 'E-book' | 'Produto Digital';
  tagline: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Optional YouTube embed URL
  price: string;
}

export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  instructor: string;
  duration: string;
  imageUrl: string;
  videoUrl: string; // Main course video
  modules: CourseModule[];
  price: string; // For single ticket purchase
}

export interface ManagedContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  textUrl?: string;
}

export type EffectiveRemedyItem = ManagedContentItem;
export type DemystifyAIItem = ManagedContentItem;
export type PartnerItem = ManagedContentItem;

export interface BulletinEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  organizer: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
}

export interface MainPageContent {
  coverImageUrl: string;
  aboutUsImageUrl: string;
  aboutUsText1: string;
  aboutUsText2: string;
  dailyMessageText: string;
  dailyMessageAuthor: string;
  testimonials: Testimonial[];
  contactEmail: string;
}

export interface AIToolContent {
  id: 'violeiro-virtual' | 'course-structure-generator' | 'study-plan-generator' | 'learn-with-ai' | 'image-generator' | 'podcast-generator';
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  textUrl: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string; // base64 data URL
  createdAt: string; // ISO string
}

export interface GeneratedPodcast {
  id: string;
  topic: string;
  script: string;
  createdAt: string; // ISO string
}
