
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnergy } from '../contexts/EnergyContext';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const UsageAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { energyData } = useEnergy();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { t } = useTranslation();

  const weeklyData = [
    { period: 'Week 1', usage: 52.3, cost: 18.8 },
    { period: 'Week 2', usage: 48.7, cost: 17.5 },
    { period: 'Week 3', usage: 45.2, cost: 16.2 },
    { period: 'Week 4', usage: 49.8, cost: 17.9 },
  ];

  const maxUsage = Math.max(...weeklyData.map(d => d.usage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pb-20">
      <Header title={t('analytics.title')} subtitle={t('analytics.subtitle')} />

      <div className="p-4 space-y-6">
        {/* Efficiency Score Meter */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{t('analytics.efficiencyScore')}</h3>
                <p className="text-purple-100 text-sm">{t('analytics.yourOptimization')}</p>
              </div>
              <Award className="w-8 h-8 text-purple-200" />
            </div>
            
            <div className="relative">
              <div className="w-full h-4 bg-purple-400 rounded-full overflow-hidden">
                <div 
                  className="h-full bg.white rounded-full transition-all duration-2000 ease-out"
                  style={{ width: `${energyData.efficiencyScore}%` }}
                ></div>
              </div>
              <div className="text-right mt-2">
                <span className="text-2xl font-bold">{energyData.efficiencyScore}</span>
                <span className="text-purple-200">/100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Period Filter */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          {['daily', 'weekly', 'monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t(`analytics.period${period.charAt(0).toUpperCase() + period.slice(1)}` as any)}
            </button>
          ))}
        </div>

        {/* Usage Chart */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('analytics.energyConsumption')}</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((item, index) => (
                <div key={item.period} className="flex items-center space-x-4">
                  <div className="w-16 text-sm font-medium text-gray-600">
                    {item.period}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">{item.usage} kWh</span>
                      <span className="text-sm font-semibold text-green-600">{item.cost} TL</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(item.usage / maxUsage) * 100}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-green-50 border-green-200 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="font-bold text-green-800 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {t('analytics.weeklyInsights')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-700">{t('analytics.bestDay')}</span>
                <span className="font-semibold text-green-800">Thursday (6.8 kWh)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700">{t('analytics.avgDaily')}</span>
                <span className="font-semibold text-green-800">7.9 kWh</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-700">{t('analytics.trend')}</span>
                <span className="font-semibold text-green-800 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {t('analytics.improvingBy')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsageAnalytics;
