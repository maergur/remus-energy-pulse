
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Battery, Leaf, Trophy, ArrowRight, Target, CreditCard } from 'lucide-react';
import AppleWatchGauge from '../components/AppleWatchGauge';
import { useEnergy } from '../contexts/EnergyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { energyData } = useEnergy();

  const dailyUsageData = [
    { day: 'Mon', usage: 8.2 },
    { day: 'Tue', usage: 7.5 },
    { day: 'Wed', usage: 9.1 },
    { day: 'Thu', usage: 6.8 },
    { day: 'Fri', usage: 7.3 },
    { day: 'Sat', usage: 8.9 },
    { day: 'Sun', usage: 7.5 },
  ];

  const maxUsage = Math.max(...dailyUsageData.map(d => d.usage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-safe">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Remus</h1>
              <p className="text-sm text-gray-500">Energy Monitor</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Good morning</p>
            <p className="font-semibold text-gray-900">Energy Saver</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Apple Watch Style Gauge */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden ios-bounce">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Today's Usage</h2>
              <p className="text-sm text-gray-500">Real-time monitoring</p>
            </div>
            <AppleWatchGauge />
            
            {/* Quick stats */}
            <div className="flex justify-around mt-6 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{energyData.costToday}</div>
                <div className="text-xs text-gray-500">TL Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{energyData.efficiencyScore}</div>
                <div className="text-xs text-gray-500">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{energyData.streak}</div>
                <div className="text-xs text-gray-500">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Usage Chart */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Weekly Overview</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/analytics')}
                className="text-green-600 hover:text-green-700"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="flex items-end justify-between h-32 space-x-2">
              {dailyUsageData.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-1000 ease-out"
                    style={{ 
                      height: `${(item.usage / maxUsage) * 100}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">{item.day}</div>
                  <div className="text-xs text-gray-400">{item.usage}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badge */}
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Eco Star Achievement</h3>
                <p className="text-purple-100 text-sm">3-day energy saving streak!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/goals')}
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 text-base font-semibold shadow-lg"
          >
            <Target className="w-5 h-5 mr-2" />
            Set Goal
          </Button>
          <Button 
            onClick={() => navigate('/bill')}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 rounded-2xl h-14 text-base font-semibold shadow-lg"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            View Bill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
