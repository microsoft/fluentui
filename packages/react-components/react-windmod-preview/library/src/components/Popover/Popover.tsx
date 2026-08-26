'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderPopover,
  usePopover,
  usePopoverContextValues,
} from '@fluentui/react-headless-components-preview/popover';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { PopoverProps } from './Popover.types';
import { PopoverLookProvider } from './PopoverContext';
import { popoverOffset } from './popoverOffset';

/**
 * A Popover displays content on top of other content. Windmod Popover: the headless popover
 * (native top layer + CSS anchor positioning) decorated with the Fluent visual contract.
 */
export const Popover = (props: PopoverProps): JSXElement => {
  // Not wrapped in forwardRef, so the parameter list is part of the emitted public signature —
  // see Tooltip.tsx.
  const { appearance, size = 'medium', withArrow = false, ...rest } = props;

  const resolved = resolvePositioningShorthand(rest.positioning);
  // Griffel parity: an arrow has nothing to point at when the surface covers its target.
  const arrow = withArrow && !resolved.coverTarget;

  const state = usePopover({
    ...rest,
    withArrow: arrow,
    positioning: { ...resolved, offset: popoverOffset(resolved.offset, arrow, size) },
  });

  const look = React.useMemo(() => ({ appearance, size }), [appearance, size]);

  return <PopoverLookProvider value={look}>{renderPopover(state, usePopoverContextValues(state))}</PopoverLookProvider>;
};

Popover.displayName = 'Popover';
