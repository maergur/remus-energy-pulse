
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Target, CreditCard, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/analytics', icon: BarChart3, label: t('nav.analytics') },
    { path: '/goals', icon: Target, label: t('nav.goals') },
    { path: '/bill', icon: CreditCard, label: t('nav.bill') },
    { path: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white border-t border-gray-200 safe-area-bottom" style={{ maxWidth: '430px' }}>
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-green-700' : ''} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
