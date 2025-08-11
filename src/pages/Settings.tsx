
import React, { useState } from 'react';
import { ArrowLeft, Bell, Key, User, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState({
    dailyUsage: true,
    billReminders: true,
    goalAchievements: true,
    challenges: false
  });
  const [apiKey, setApiKey] = useState('');

  const settingsGroups = [
    {
      title: t('settings.notifications'),
      icon: Bell,
      items: [
        { 
          key: 'dailyUsage', 
          label: t('settings.dailyUsageUpdates'), 
          description: t('settings.dailyUsageDesc'),
          type: 'toggle'
        },
        { 
          key: 'billReminders', 
          label: t('settings.billReminders'), 
          description: t('settings.billRemindersDesc'),
          type: 'toggle'
        },
        { 
          key: 'goalAchievements', 
          label: t('settings.goalAchievements'), 
          description: t('settings.goalAchievementsDesc'),
          type: 'toggle'
        },
        { 
          key: 'challenges', 
          label: t('settings.challenges'), 
          description: t('settings.challengesDesc'),
          type: 'toggle'
        }
      ]
    },
    {
      title: t('settings.account'),
      icon: User,
      items: [
        { label: t('settings.profileSettings'), type: 'button', action: () => {} },
        { label: t('settings.energyMeterConnection'), type: 'button', action: () => {} },
        { label: t('settings.dataExport'), type: 'button', action: () => {} }
      ]
    },
    {
      title: t('settings.apiIntegration'),
      icon: Key,
      items: [
        { 
          label: t('settings.apiKey'), 
          description: t('settings.apiKeyDesc'),
          type: 'input',
          key: 'apiKey'
        }
      ]
    },
    {
      title: t('settings.support'),
      icon: HelpCircle,
      items: [
        { label: t('settings.helpCenter'), type: 'button', action: () => {} },
        { label: t('settings.contactSupport'), type: 'button', action: () => {} },
        { label: t('settings.privacyPolicy'), type: 'button', action: () => {} },
        { label: t('settings.terms'), type: 'button', action: () => {} }
      ]
    }
  ];

  const handleToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-20">
      <Header title={t('settings.title')} subtitle={t('settings.subtitle')} />

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{t('settings.energySaver')}</h2>
                <p className="text-green-100">{t('settings.premiumMember')}</p>
                <p className="text-green-200 text-sm">{t('settings.memberSince')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <div key={group.title as string}>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <group.icon className="w-5 h-5 mr-2 text-green-600" />
              {group.title}
            </h2>
            
            <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {group.items.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 ${index !== group.items.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    {item.type === 'toggle' && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.label}</h3>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          )}
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={() => handleToggle(item.key!)}
                        />
                      </div>
                    )}
                    
                    {item.type === 'input' && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                        )}
                        <Input
                          type="password"
                          placeholder={t('settings.enterApiKey') || ''}
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="bg-gray-50"
                        />
                      </div>
                    )}
                    
                    {item.type === 'button' && (
                      <button 
                        onClick={item.action}
                        className="w-full text-left py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                      >
                        <span className="font-semibold text-gray-900">{item.label}</span>
                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
                      </button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Sign Out */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-4">
            <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 py-3 rounded-2xl transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">{t('settings.signOut')}</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
