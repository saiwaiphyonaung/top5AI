import { useState, useEffect } from 'react';

const STORAGE_KEY = 'siteVisitorCount';
const SESSION_KEY = 'sessionVisited';

export const useVisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let currentCount = localStorage.getItem(STORAGE_KEY);
    let countAsNumber: number;

    if (currentCount) {
      countAsNumber = parseInt(currentCount, 10);
    } else {
      // Initialize with a random number to look more established on first visit
      countAsNumber = Math.floor(Math.random() * 50000) + 50000;
    }

    const hasVisitedThisSession = sessionStorage.getItem(SESSION_KEY);

    if (!hasVisitedThisSession) {
      countAsNumber += 1;
      localStorage.setItem(STORAGE_KEY, countAsNumber.toString());
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
    
    setVisitorCount(countAsNumber);

  }, []); // Run only once on initial mount

  return visitorCount;
};
