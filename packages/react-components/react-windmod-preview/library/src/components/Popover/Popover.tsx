'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderPopover,
  usePopover,
  usePopoverContextValues,
} from '@fluentui/react-headless-components-preview/popover';

import type { PopoverProps } from './Popover.types';
import { PopoverLookProvider } from './PopoverContext';
import { resolvePopoverArrow } from './popoverOffset';

/**
 * A Popover displays content on top of other content. Windmod Popover: the headless popover
 * (native top layer + CSS anchor positioning) decorated with the Fluent visual contract.
 */
export const Popover = (props: PopoverProps): JSXElement => {
  // Not wrapped in forwardRef, so the parameter list is part of the emitted public signature —
  // see Tooltip.tsx.
  const { appearance, size = 'medium', withArrow = false, ...rest } = props;

  const state = usePopover({ ...rest, ...resolvePopoverArrow(rest.positioning, withArrow, size) });

  const look = React.useMemo(() => ({ appearance, size }), [appearance, size]);

  return <PopoverLookProvider value={look}>{renderPopover(state, usePopoverContextValues(state))}</PopoverLookProvider>;
};

Popover.displayName = 'Popover';
