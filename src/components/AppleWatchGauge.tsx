
import React, { useEffect, useState } from 'react';
import { useEnergy } from '../contexts/EnergyContext';

const AppleWatchGauge: React.FC = () => {
  const { energyData } = useEnergy();
  const [animateRings, setAnimateRings] = useState(false);

  const usagePercentage = (energyData.currentUsage / energyData.dailyGoal) * 100;
  const efficiencyPercentage = energyData.efficiencyScore;
  const streakPercentage = Math.min((energyData.streak / 7) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateRings(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getUsageColor = (percentage: number) => {
    if (percentage <= 50) return '#1A5D1A'; // Green for low usage
    if (percentage <= 80) return '#6B46C1'; // Purple for moderate
    return '#EF4444'; // Red for high usage
  };

  const createRingPath = (percentage: number, radius: number) => {
    const angle = (percentage / 100) * 270; // 270 degrees max
    const startAngle = -135; // Start from top-left
    const endAngle = startAngle + angle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const centerX = 120;
    const centerY = 120;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full pulse-glow opacity-20"></div>
      
      <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-45">
        {/* Background rings */}
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          cx="120"
          cy="120"
          r="80"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          cx="120"
          cy="120"
          r="60"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Animated progress rings */}
        <path
          d={createRingPath(animateRings ? usagePercentage : 0, 100)}
          fill="none"
          stroke={getUsageColor(usagePercentage)}
          strokeWidth="8"
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
        />
        <path
          d={createRingPath(animateRings ? efficiencyPercentage : 0, 80)}
          fill="none"
          stroke="#6B46C1"
          strokeWidth="8"
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out delay-300"
        />
        <path
          d={createRingPath(animateRings ? streakPercentage : 0, 60)}
          fill="none"
          stroke="#A3E4D7"
          strokeWidth="8"
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out delay-600"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-gray-900">
          {energyData.currentUsage}
        </div>
        <div className="text-sm text-gray-500">kWh used</div>
        <div className="text-xs text-gray-400 mt-1">
          of {energyData.dailyGoal} kWh goal
        </div>
      </div>

      {/* Ring labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
          Usage
        </div>
        <div className="absolute top-8 right-8 text-xs text-purple-600 font-medium">
          Efficiency
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium"
             style={{ color: '#A3E4D7' }}>
          Streak
        </div>
      </div>
    </div>
  );
};

export default AppleWatchGauge;
