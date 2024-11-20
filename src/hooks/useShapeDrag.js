import { useCallback } from 'react';

export const useShapeDrag = ({ shapeRef, shapeSize, effectsEnabled }) => {
  const handleDragStart = useCallback(() => {
    // Drag start logic
  }, []);

  const handleDrag = useCallback(() => {
    // Drag logic
  }, []);

  const handleDragEnd = useCallback(() => {
    // Drag end logic
  }, []);

  return { handleDragStart, handleDrag, handleDragEnd };
};
