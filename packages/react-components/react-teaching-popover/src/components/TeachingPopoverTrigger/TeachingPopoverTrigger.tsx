import * as React from 'react';
import type { FluentTriggerComponent } from '@fluentui/react-utilities';
import { TeachingPopoverTriggerProps } from './TeachingPopoverTrigger.types';
import { renderTeachingPopoverTrigger_unstable } from './renderTeachingPopoverTrigger';
import { useTeachingPopoverTrigger_unstable } from './useTeachingPopoverTrigger';

/**
 * Direct extension of PopoverTrigger - Wraps a trigger element as an only child and adds the necessary event handling to open a teaching bubble.
 */
export const TeachingPopoverTrigger: React.FC<TeachingPopoverTriggerProps> = props => {
  const state = useTeachingPopoverTrigger_unstable(props);

  return renderTeachingPopoverTrigger_unstable(state);
};

TeachingPopoverTrigger.displayName = 'TeachingPopoverTrigger';
// type casting here is required to ensure internal type FluentTriggerComponent is not leaked
(TeachingPopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
