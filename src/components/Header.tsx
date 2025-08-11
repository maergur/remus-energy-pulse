import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Header: React.FC<{ title?: string; subtitle?: string }> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const toggleLanguage = () => {
    const next = i18n.language?.startsWith('tr') ? 'en' : 'tr';
    i18n.changeLanguage(next);
  };
  return (
    <div className="bg-white shadow-sm sticky top-0 z-20 safe-area-x pt-safe">
      <div className="flex items-center justify-between p-4">
        <div>
          {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label={t('header.language')}>
            <Globe className="w-5 h-5 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            aria-label={t('header.profileAria')}
          >
            <User className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header; 