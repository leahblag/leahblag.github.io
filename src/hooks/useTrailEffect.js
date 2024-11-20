import { useCallback } from 'react';

export const useTrailEffect = (effectsEnabled) => {
  return useCallback((event) => {
    if (!effectsEnabled) return;
    // Trail effect implementation
  }, [effectsEnabled]);
};
