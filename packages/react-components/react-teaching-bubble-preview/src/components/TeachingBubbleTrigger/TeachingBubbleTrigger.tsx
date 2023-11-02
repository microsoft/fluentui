import * as React from 'react';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { TeachingBubbleTriggerProps } from './TeachingBubbleTrigger.types';
import { renderTeachingBubbleTrigger_unstable } from './renderTeachingBubbleTrigger';
import { useTeachingBubbleTrigger_unstable } from './useTeachingBubbleTrigger';

/**
 * Wraps a trigger element as an only child and adds the necessary event handling to open a teaching bubble.
 */
export const TeachingBubbleTrigger: React.FC<TeachingBubbleTriggerProps> = props => {
  const state = useTeachingBubbleTrigger_unstable(props);

  return renderTeachingBubbleTrigger_unstable(state);
};

TeachingBubbleTrigger.displayName = 'TeachingBubbleTrigger';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(TeachingBubbleTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
