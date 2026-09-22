'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import type { PopoverProps } from './Popover.types';
import { renderPopover } from './renderPopover';
import { usePopover, usePopoverContextValues } from './usePopover';

/** Wrapper component that manages a PopoverTrigger and PopoverSurface. */
export const Popover = (props: PopoverProps): JSXElement => {
  const state = usePopover(props);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

Popover.displayName = 'Popover';
