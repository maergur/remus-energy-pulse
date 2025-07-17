import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC<{ title?: string; subtitle?: string }> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between p-4">
        <div>
          {title && <h1 className="text-xl font-bold text-gray-900">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          aria-label="Profile"
        >
          <User className="w-6 h-6 text-gray-700" />
        </Button>
      </div>
    </div>
  );
};

export default Header; 