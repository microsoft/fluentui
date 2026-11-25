'use client';

import { usePopover } from '../Popover/usePopover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';

/**
 * Returns the state for a TeachingPopover component.
 *
 * Built on top of the headless `Popover` and defaults `withArrow` to `true`,
 * matching the v9 TeachingPopover convention.
 */
export const useTeachingPopover = (props: TeachingPopoverProps): TeachingPopoverState => {
  return usePopover({ withArrow: true, ...props });
};
