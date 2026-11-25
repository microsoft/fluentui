'use client';

import { usePopoverContextValues_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverContextValues, TeachingPopoverState } from './TeachingPopover.types';

export const useTeachingPopoverContextValues_unstable: (state: TeachingPopoverState) => TeachingPopoverContextValues =
  usePopoverContextValues_unstable;
