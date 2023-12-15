import * as React from 'react';
import { useTeachingPopover_unstable } from './useTeachingPopover';
import { renderTeachingPopover_unstable } from './renderTeachingPopover';
import type { TeachingPopoverProps } from './TeachingPopover.types';
import { useTeachingPopoverContextValues_unstable } from './useTeachingPopoverContext';

/**
 * Wrapper component that manages state for a TeachingPopoverTrigger and a TeachingPopoverSurface components.
 */
export const TeachingPopover: React.FC<TeachingPopoverProps> = props => {
  const state = useTeachingPopover_unstable(props);
  const contextValues = useTeachingPopoverContextValues_unstable(state);

  return renderTeachingPopover_unstable(state, contextValues);
};

TeachingPopover.displayName = 'TeachingPopover';
