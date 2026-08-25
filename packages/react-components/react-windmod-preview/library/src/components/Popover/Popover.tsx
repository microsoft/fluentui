'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderPopover,
  usePopover,
  usePopoverContextValues,
} from '@fluentui/react-headless-components-preview/popover';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { PopoverProps, PopoverSize } from './Popover.types';
import { PopoverLookProvider } from './PopoverContext';

/** Griffel parity: the arrow height is merged into the positioning offset, per size — it pairs
 * with the 8.484px/11.312px constants in PopoverSurface.module.css. */
const ARROW_HEIGHTS: Record<PopoverSize, number> = { small: 6, medium: 8, large: 8 };

type ResolvedOffset = ReturnType<typeof resolvePositioningShorthand>['offset'];

/** Same contract as tooltipOffset — see Tooltip.tsx. */
const popoverOffset = (offset: ResolvedOffset, withArrow: boolean, size: PopoverSize): ResolvedOffset => {
  if (!withArrow) {
    return offset;
  }
  if (offset === undefined) {
    return ARROW_HEIGHTS[size];
  }
  if (typeof offset === 'number') {
    return offset + ARROW_HEIGHTS[size];
  }
  return offset;
};

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
