'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import type { PopoverTriggerProps } from './PopoverTrigger.types';
import { renderPopoverTrigger } from './renderPopoverTrigger';
import { usePopoverTrigger } from './usePopoverTrigger';

/** Wraps a trigger element with Popover interaction and ARIA behavior. */
export const PopoverTrigger = (props: PopoverTriggerProps): JSXElement | null => {
  const state = usePopoverTrigger(props);

  return renderPopoverTrigger(state);
};

PopoverTrigger.displayName = 'PopoverTrigger';
(PopoverTrigger as FluentTriggerComponent).isFluentTriggerComponent = true;
