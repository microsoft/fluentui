'use client';

import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';
import { usePopoverAuto } from './usePopoverAuto';
import { usePopoverContextValues } from './usePopoverBase';
import { renderPopover } from './renderPopover';

/**
 * Headless Popover with `popover="auto"` semantics.
 */
export const PopoverAuto = (props: PopoverProps): JSXElement => {
  const state = usePopoverAuto(props);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

PopoverAuto.displayName = 'PopoverAuto';
