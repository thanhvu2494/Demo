
import React from 'react';
import { Complexity } from '@/types';

interface ComplexityBadgeProps {
  complexity: Complexity;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ complexity }) => {
  return (
    <span className={`complexity-badge complexity-${complexity.className}`}>
      {complexity.notation}
    </span>
  );
};
