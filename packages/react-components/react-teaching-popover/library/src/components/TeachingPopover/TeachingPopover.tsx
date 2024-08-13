import * as React from 'react';
import { useTeachingPopover_unstable } from './useTeachingPopover';
import { renderTeachingPopover_unstable } from './renderTeachingPopover';
import type { TeachingPopoverProps } from './TeachingPopover.types';

/**
 * An extension class of Popover which defaults to withArrow and FocusTrap enabled.
 */
export const TeachingPopover: React.FC<TeachingPopoverProps> = props => {
  const state = useTeachingPopover_unstable(props);

  return renderTeachingPopover_unstable(state);
};

TeachingPopover.displayName = 'TeachingPopover';
