
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnergyData {
  currentUsage: number;
  dailyGoal: number;
  costToday: number;
  efficiencyScore: number;
  streak: number;
  badges: string[];
}

interface EnergyContextType {
  energyData: EnergyData;
  updateGoal: (goal: number) => void;
  addBadge: (badge: string) => void;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const EnergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [energyData, setEnergyData] = useState<EnergyData>({
    currentUsage: 7.5,
    dailyGoal: 10,
    costToday: 2.70,
    efficiencyScore: 85,
    streak: 3,
    badges: ['Eco Star', 'Energy Saver']
  });

  const updateGoal = (goal: number) => {
    setEnergyData(prev => ({ ...prev, dailyGoal: goal }));
  };

  const addBadge = (badge: string) => {
    setEnergyData(prev => ({
      ...prev,
      badges: [...prev.badges.filter(b => b !== badge), badge]
    }));
  };

  return (
    <EnergyContext.Provider value={{ energyData, updateGoal, addBadge }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (context === undefined) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};
