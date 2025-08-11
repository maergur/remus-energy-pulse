
import React, { useState } from 'react';
import { ArrowLeft, Target, Trophy, Plus, Zap, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEnergy } from '../contexts/EnergyContext';
import { toast } from '@/hooks/use-toast';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const GoalsChallenges: React.FC = () => {
  const navigate = useNavigate();
  const { energyData, updateGoal, addBadge } = useEnergy();
  const [newGoal, setNewGoal] = useState(energyData.dailyGoal.toString());
  const [showGoalInput, setShowGoalInput] = useState(false);
  const { t } = useTranslation();

  const challenges = [
    {
      id: 1,
      title: t('goals.challenge1Title'),
      description: t('goals.challenge1Desc'),
      progress: 60,
      reward: 'Eco Warrior Badge',
      daysLeft: 2,
      icon: Zap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: t('goals.challenge2Title'),
      description: t('goals.challenge2Desc'),
      progress: 80,
      reward: 'Weekend Hero Badge',
      daysLeft: 1,
      icon: Leaf,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: t('goals.challenge3Title'),
      description: t('goals.challenge3Desc'),
      progress: 45,
      reward: 'Efficiency Master Badge',
      daysLeft: 16,
      icon: Trophy,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleSaveGoal = () => {
    const goal = parseFloat(newGoal);
    if (goal > 0) {
      updateGoal(goal);
      setShowGoalInput(false);
      toast({
        title: t('goals.goalUpdatedTitle'),
        description: t('goals.goalUpdatedDesc', { goal }),
      });
    }
  };

  const joinChallenge = (challenge: any) => {
    toast({
      title: t('goals.challengeJoinedTitle'),
      description: t('goals.challengeJoinedDesc', { title: challenge.title }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20">
      <Header title={t('goals.title')} subtitle={t('goals.subtitle')} />

      <div className="p-4 space-y-6">
        {/* Current Goal */}
        <Card className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-6 h-6 text-green-600 mr-2" />
                {t('goals.dailyEnergyGoal')}
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowGoalInput(!showGoalInput)}
                className="text-green-600 border-green-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                {t('goals.edit')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showGoalInput ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t('goals.newDailyGoal')}
                  </label>
                  <Input
                    type="number"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="text-lg"
                    placeholder={t('goals.enterDailyGoal') || ''}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button onClick={handleSaveGoal} className="flex-1 bg-green-600 hover:bg-green-700">
                    {t('goals.saveGoal')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowGoalInput(false)}
                    className="flex-1"
                  >
                    {t('goals.cancel')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {energyData.dailyGoal} kWh
                </div>
                <div className="text-gray-600">{t('goals.currentDailyTarget')}</div>
                <div className="mt-4">
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((energyData.currentUsage / energyData.dailyGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{t('goals.used', { value: energyData.currentUsage })}</span>
                    <span>{t('goals.remaining', { value: (energyData.dailyGoal - energyData.currentUsage).toFixed(1) })}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('goals.activeChallenges')}</h2>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="bg-white shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${challenge.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <challenge.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-500">{t('goals.progress')}</span>
                          <span className="text-xs font-bold text-gray-700">{challenge.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${challenge.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <Trophy className="w-3 h-3 inline mr-1" />
                          {challenge.reward}
                        </div>
                        <div className="text-xs font-medium text-gray-700">
                          {t('goals.daysLeft', { days: challenge.daysLeft })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              {t('goals.yourBadges')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {energyData.badges.map((badge, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsChallenges;
