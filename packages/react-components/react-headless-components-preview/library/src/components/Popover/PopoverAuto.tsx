'use client';

import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';
import { usePopoverAuto, usePopoverContextValues } from './usePopover';
import { renderPopover } from './renderPopover';

/**
 * Headless Popover with `popover="auto"` semantics.
 *
 * Same composition as `Popover`, but defers light dismiss (Escape,
 * click-outside) and popover-stack interactions to the browser. Browser
 * `toggle` events are mirrored back into React state and `onOpenChange`.
 *
 * Use this when you want native nested-popover behaviour: opening a
 * descendant popover keeps its ancestors open, while opening an unrelated
 * popover dismisses any peers — both delegated to the browser's stack.
 */
export const PopoverAuto = (props: PopoverProps): JSXElement => {
  const state = usePopoverAuto(props);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

PopoverAuto.displayName = 'PopoverAuto';
