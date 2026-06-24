import { createContext, useState, useEffect } from 'react';

export const HealthContext = createContext();

/**
 * Global provider for managing all health, nutrition, and UI state.
 * Uses localStorage for data persistence across sessions.
 */
export const HealthProvider = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [waterLogs, setWaterLogs] = useState(() => {
    return JSON.parse(localStorage.getItem('nutrimind-water-logs')) || [];
  });
  const [waterGoal, setWaterGoal] = useState(() => {
    return JSON.parse(localStorage.getItem('nutrimind-water-goal')) || 3000;
  });
  const [historyEvents, setHistoryEvents] = useState(() => {
    return JSON.parse(localStorage.getItem('nutrimind-history-events')) || [];
  });
  const [streaks, setStreaks] = useState(() => {
    return JSON.parse(localStorage.getItem('nutrimind-streaks')) || { current: 0, highest: 0, lastActiveDate: null };
  });
  const [achievements, setAchievements] = useState(() => {
    return JSON.parse(localStorage.getItem('nutrimind-achievements')) || [];
  });
  const [aiReports, setAiReports] = useState(() => {
    const raw = JSON.parse(localStorage.getItem('nutrimind-ai-reports')) || [];
    if (raw.length > 0 && !raw[0].tenDayPlan) {
      localStorage.removeItem('nutrimind-ai-reports');
      return [];
    }
    return raw;
  });

  // Sync to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('nutrimind-water-logs', JSON.stringify(waterLogs));
  }, [waterLogs]);

  useEffect(() => {
    localStorage.setItem('nutrimind-water-goal', JSON.stringify(waterGoal));
  }, [waterGoal]);

  useEffect(() => {
    localStorage.setItem('nutrimind-history-events', JSON.stringify(historyEvents));
  }, [historyEvents]);

  useEffect(() => {
    localStorage.setItem('nutrimind-streaks', JSON.stringify(streaks));
  }, [streaks]);

  useEffect(() => {
    localStorage.setItem('nutrimind-achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('nutrimind-ai-reports', JSON.stringify(aiReports));
  }, [aiReports]);

  /**
   * Calculates the current active streak.
   * If the user was active yesterday, increments the streak.
   * Unlocks achievements at 3 and 7 days.
   */
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setStreaks(prev => {
      if (prev.lastActiveDate === today) return prev; // Already active today

      let newCurrent = prev.current;
      const lastActive = prev.lastActiveDate ? new Date(prev.lastActiveDate) : null;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (prev.lastActiveDate === yesterdayStr) {
        newCurrent += 1;
      } else {
        newCurrent = 1;
      }

      const newHighest = Math.max(newCurrent, prev.highest);
      
      // Achievement check
      if (newCurrent === 3 && !achievements.includes('3-Day Streak')) {
        unlockAchievement('3-Day Streak');
      }
      if (newCurrent === 7 && !achievements.includes('7-Day Streak')) {
        unlockAchievement('7-Day Streak');
      }

      return { current: newCurrent, highest: newHighest, lastActiveDate: today };
    });
  };

  /**
   * Unlocks a specific gamification badge.
   * @param {string} badgeName - The name of the badge to unlock.
   */
  const unlockAchievement = (badgeName) => {
    setAchievements(prev => {
      if (!prev.includes(badgeName)) {
        return [...prev, badgeName];
      }
      return prev;
    });
  };

  // Actions
  const addWater = (amount) => {
    updateStreak();
    const newLog = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date().toISOString(),
    };
    setWaterLogs(prev => [...prev, newLog]);
    
    // Check hydration achievement
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTotal = [...waterLogs, newLog]
      .filter(log => log.timestamp.startsWith(todayStr))
      .reduce((sum, log) => sum + log.amount, 0);
      
    if (todayTotal >= waterGoal && !achievements.includes('Hydration Hero')) {
      unlockAchievement('Hydration Hero');
    }
  };

  const addHistoryEvent = (type, details) => {
    updateStreak();
    const newEvent = {
      id: Date.now().toString(),
      type,
      details,
      timestamp: new Date().toISOString(),
    };
    setHistoryEvents(prev => [newEvent, ...prev]);

    if (type === 'scan' && !achievements.includes('First Scan')) {
      unlockAchievement('First Scan');
    }
  };

  /**
   * Saves a newly generated Gemini report to history.
   * @param {Object} reportData - The JSON report to save.
   */
  const saveReport = (reportData) => {
    setAiReports(prev => [reportData, ...prev]);
  };

  /**
   * Retrieves the most recently generated AI report.
   * @returns {Object|null} The latest report, or null if empty.
   */
  const getLatestReport = () => {
    return aiReports.length > 0 ? aiReports[0] : null;
  };

  /**
   * Exports all locally stored user data as a JSON file.
   */
  const exportData = () => {
    const dataStr = JSON.stringify({
      waterLogs,
      waterGoal,
      waterGoal,
      historyEvents,
      streaks,
      achievements,
      aiReports
    }, null, 2);
    
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nutrimind-health-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contextValue = {
    waterLogs,
    waterGoal,
    historyEvents,
    streaks,
    achievements,
    aiReports,
    setWaterGoal,
    addWater,
    addHistoryEvent,
    saveReport,
    getLatestReport,
    exportData
  };

  return (
    <HealthContext.Provider value={contextValue}>
      {children}
    </HealthContext.Provider>
  );
};
