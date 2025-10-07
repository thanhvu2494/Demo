
import React from 'react';
import { ComplexityInfo } from '@/types';

interface ComplexityBadgeProps {
  complexity: ComplexityInfo;
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ complexity }) => {
  return (
    <span className={`complexity-badge complexity-${complexity.className}`}>
      {complexity.notation}
    </span>
  );
};
