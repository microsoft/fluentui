'use client';

import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';
import { usePopover } from './usePopover';
import { usePopoverContextValues } from './usePopoverBase';
import { renderPopover } from './renderPopover';

/**
 * Headless Popover component.
 */
export const Popover = (props: PopoverProps): JSXElement => {
  const state = usePopover(props);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

Popover.displayName = 'Popover';
