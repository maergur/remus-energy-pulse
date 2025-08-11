
import React, { useEffect, useState } from 'react';
import { useEnergy } from '../contexts/EnergyContext';
import { useTranslation } from 'react-i18next';

const AppleWatchGauge: React.FC = () => {
  const { energyData } = useEnergy();
  const [animateRings, setAnimateRings] = useState(false);
  const { t } = useTranslation();

  const usagePercentage = (energyData.currentUsage / energyData.dailyGoal) * 100;
  const efficiencyPercentage = energyData.efficiencyScore;
  const streakPercentage = Math.min((energyData.streak / 7) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateRings(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getUsageColor = (percentage: number) => {
    if (percentage <= 50) return 'hsl(var(--remus-primary))'; // Primary green for low usage
    if (percentage <= 80) return 'hsl(var(--remus-accent))'; // Purple for moderate
    return 'hsl(0 84% 60%)'; // Red for high usage
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
    <div className="relative w-60 h-60 mx-auto">
      {/* Enhanced background glow effect */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-xl"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 pulse-glow"></div>
      
      {/* Main gauge container with subtle gradient background */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-muted/50 to-background/80 backdrop-blur-sm border border-border/20"></div>
      
      <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-45 relative z-10">
        {/* Enhanced background rings with gradient strokes */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="url(#backgroundGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle
          cx="120"
          cy="120"
          r="80"
          fill="none"
          stroke="url(#backgroundGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.4"
        />
        <circle
          cx="120"
          cy="120"
          r="60"
          fill="none"
          stroke="url(#backgroundGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Enhanced animated progress rings with glow effect */}
        <path
          d={createRingPath(animateRings ? usagePercentage : 0, 100)}
          fill="none"
          stroke={getUsageColor(usagePercentage)}
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-2000 ease-out drop-shadow-sm"
        />
        <path
          d={createRingPath(animateRings ? efficiencyPercentage : 0, 80)}
          fill="none"
          stroke="hsl(var(--remus-accent))"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-2000 ease-out delay-300 drop-shadow-sm"
        />
        <path
          d={createRingPath(animateRings ? streakPercentage : 0, 60)}
          fill="none"
          stroke="hsl(var(--remus-highlight))"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-2000 ease-out delay-600 drop-shadow-sm"
        />
      </svg>

      {/* Enhanced center content with better typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="text-3xl font-bold text-foreground leading-none mb-1 tracking-tight">
          {energyData.currentUsage}
        </div>
        <div className="text-sm text-muted-foreground font-medium leading-none mb-1">{t('gauge.kwhUsed')}</div>
        <div className="text-xs text-muted-foreground leading-tight text-center px-2 opacity-75">
          {t('gauge.ofGoal', { goal: energyData.dailyGoal })}
        </div>
      </div>

      {/* Enhanced ring labels with better positioning and colors */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-foreground/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/20">
          {t('dashboard.usage')}
        </div>
        <div className="absolute top-8 right-8 text-xs font-semibold text-accent bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/20">
          {t('gauge.efficiency')}
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/20"
             style={{ color: 'hsl(var(--remus-highlight))' }}>
          {t('gauge.streak')}
        </div>
      </div>
    </div>
  );
};

export default AppleWatchGauge;
