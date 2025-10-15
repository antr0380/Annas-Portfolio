// usePageVisibility.js
import { useState, useEffect } from 'react';

function usePageVisibility() {
  // Börja med att anta att sidan är synlig
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    // Funktion som körs när flikens status ändras
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Lyssnar på eventet
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Städa upp event-lyssnaren
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Körs bara vid montering/avmontering

  return isVisible;
}

export default usePageVisibility;