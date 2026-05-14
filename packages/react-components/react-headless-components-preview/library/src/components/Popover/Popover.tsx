'use client';

import type { PopoverProps } from './Popover.types';
import type { JSXElement } from '@fluentui/react-utilities';
import { usePopover, usePopoverContextValues } from './usePopover';
import { renderPopover } from './renderPopover';

/**
 * Headless Popover component.
 *
 * Renders the surface in the browser's top layer with `popover="auto"`,
 * letting the platform handle light dismiss (Escape, click-outside,
 * popover-stack peer dismissal). Open paths (click, hover, context menu,
 * controlled `open` prop) flow through React; close paths defer to the
 * browser, with `toggle` events mirrored back into state.
 */
export const Popover = (props: PopoverProps): JSXElement => {
  const state = usePopover(props);
  const contextValues = usePopoverContextValues(state);

  return renderPopover(state, contextValues);
};

Popover.displayName = 'Popover';
