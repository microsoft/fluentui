'use client';

import { usePopover } from '../../Popover/Popover/usePopover';
import type { TeachingPopoverProps, TeachingPopoverState } from './TeachingPopover.types';

/** Create the state required to render TeachingPopover. */
export const useTeachingPopover = (props: TeachingPopoverProps): TeachingPopoverState =>
  usePopover({ withArrow: true, trapFocus: true, ...props });
