
import React from 'react';
import {
  ContentIcon, PeopleIcon, AdminIcon, SupportIcon,
  CourseIcon, ExerciseIcon, SimulationIcon, ImageIcon, PodcastIcon, MusicIcon,
  BulletinIcon, ServiceIcon, PartnershipIcon, SubscriptionIcon, FinanceIcon,
  MediaIcon, MessageIcon, GlobalIcon, TestIcon, ProfileIcon, ManualIcon,
  MaintenanceIcon
} from './icons';
import type { DashboardLink, IconName } from '../types';


interface DashboardCardProps {
  title: string;
  icon: IconName;
  links: DashboardLink[];
  onLinkClick: (id: string) => void;
}

const iconMap: Record<IconName, React.FC<{className?: string}>> = {
  content: ContentIcon,
  people: PeopleIcon,
  admin: AdminIcon,
  support: SupportIcon,
  course: CourseIcon,
  exercise: ExerciseIcon,
  simulation: SimulationIcon,
  image: ImageIcon,
  podcast: PodcastIcon,
  music: MusicIcon,
  bulletin: BulletinIcon,
  service: ServiceIcon,
  partnership: PartnershipIcon,
  subscription: SubscriptionIcon,
  finance: FinanceIcon,
  media: MediaIcon,
  message: MessageIcon,
  global: GlobalIcon,
  test: TestIcon,
  profile: ProfileIcon,
  manual: ManualIcon,
  maintenance: MaintenanceIcon,
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, links, onLinkClick }) => {
  const MainIcon = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-5">
        <div className="bg-blue-100 p-2 rounded-full">
          <MainIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="ml-4 text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <ul className="space-y-3">
        {links.map((link) => {
          const LinkIcon = iconMap[link.icon];
          return (
            <li key={link.name}>
              <button
                onClick={() => onLinkClick(link.id)}
                className="flex items-center p-2 rounded-md group hover:bg-slate-100 transition-colors duration-150 w-full text-left"
              >
                <LinkIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900">{link.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardCard;