'use client';

import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';
import { usePopover, usePopoverContextValues } from './usePopover';
import { renderPopover } from './renderPopover';

/**
 * Headless Popover component.
 *
 * Provides unstyled popover behavior with native browser APIs.
 * Uses HTML popover attribute for top-layer rendering and
 * CSS anchor positioning for placement.
 */
export const Popover = (props: PopoverProps): JSXElement => {
  const state = usePopover(props, null);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

Popover.displayName = 'Popover';
