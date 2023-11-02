import * as React from 'react';
import { useTeachingBubble_unstable } from './useTeachingBubble';
import { renderTeachingBubble_unstable } from './renderTeachingBubble';
import type { TeachingBubbleProps } from './TeachingBubble.types';

/**
 * Wrapper component that manages state for a TeachingBubbleTrigger and a TeachingBubbleSurface components.
 */
export const TeachingBubble: React.FC<TeachingBubbleProps> = props => {
  const state = useTeachingBubble_unstable(props);

  return renderTeachingBubble_unstable(state);
};

TeachingBubble.displayName = 'TeachingBubble';
