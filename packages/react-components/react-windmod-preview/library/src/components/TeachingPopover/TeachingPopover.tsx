'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderTeachingPopover,
  useTeachingPopover,
  useTeachingPopoverContextValues,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import { PopoverLookProvider } from '../Popover/PopoverContext';
import { popoverOffset } from '../Popover/popoverOffset';
import type { TeachingPopoverProps } from './TeachingPopover.types';

/**
 * A TeachingPopover is a Popover carrying a guided, chromed layout — a header, a title, a body and
 * a footer of actions. Windmod TeachingPopover: the headless teaching popover (native top layer +
 * CSS anchor positioning) decorated with the Fluent visual contract.
 */
export const TeachingPopover = (props: TeachingPopoverProps): JSXElement => {
  // Not wrapped in forwardRef, so the parameter list is part of the emitted public signature —
  // see Tooltip.tsx.
  const { appearance, size = 'medium', withArrow, ...rest } = props;

  const resolved = resolvePositioningShorthand(rest.positioning);

  // Griffel resolves the positioning inside usePopover and only then defaults `withArrow` on, so
  // an arrow that is on BY DEFAULT never reaches the offset merge: it overlaps the gap instead of
  // pushing the surface away, and the coverTarget suppression is overridden back on. Both are
  // measured Griffel behaviour and both are load-bearing for parity — an unconditional merge puts
  // every surface 8px too far from its trigger.
  const arrow = withArrow ?? true;
  const offsetArrow = withArrow === true && !resolved.coverTarget;

  const state = useTeachingPopover({
    ...rest,
    withArrow: arrow,
    positioning: { ...resolved, offset: popoverOffset(resolved.offset, offsetArrow, size) },
  });

  const look = React.useMemo(() => ({ appearance, size }), [appearance, size]);

  const contextValues = useTeachingPopoverContextValues(state);

  return <PopoverLookProvider value={look}>{renderTeachingPopover(state, contextValues)}</PopoverLookProvider>;
};

TeachingPopover.displayName = 'TeachingPopover';
