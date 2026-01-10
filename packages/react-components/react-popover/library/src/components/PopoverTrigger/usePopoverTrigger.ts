'use client';

import type { PopoverTriggerProps, PopoverTriggerState } from './PopoverTrigger.types';
import { usePopoverTriggerBase_unstable } from './usePopoverTriggerBase';

/**
 * Create the state required to render PopoverTrigger.
 *
 * The returned state can be modified with hooks such as usePopoverTriggerStyles,
 * before being passed to renderPopoverTrigger_unstable.
 *
 * @param props - props from this instance of PopoverTrigger
 */
export const usePopoverTrigger_unstable = (props: PopoverTriggerProps): PopoverTriggerState => {
  return usePopoverTriggerBase_unstable(props);
};
