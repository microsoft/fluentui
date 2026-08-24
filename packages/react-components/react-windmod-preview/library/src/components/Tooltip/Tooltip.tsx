'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { renderTooltip, useTooltip } from '@fluentui/react-headless-components-preview/tooltip';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { TooltipProps } from './Tooltip.types';
import { useTooltipStyles } from './useTooltipStyles';

/** Griffel parity: base offset 4; withArrow adds the 6px arrow height (pairs with the
 * 8.484px/−4.242px constants in Tooltip.module.css). */
const TOOLTIP_OFFSET = 4;
const ARROW_HEIGHT = 6;

type ResolvedOffset = ReturnType<typeof resolvePositioningShorthand>['offset'];

/** A consumer offset is honoured as given; only a numeric one can absorb the arrow height. */
const tooltipOffset = (offset: ResolvedOffset, withArrow: boolean): ResolvedOffset => {
  if (offset === undefined) {
    return TOOLTIP_OFFSET + (withArrow ? ARROW_HEIGHT : 0);
  }
  if (typeof offset === 'number' && withArrow) {
    return offset + ARROW_HEIGHT;
  }
  return offset;
};

/** Tooltip: the headless tooltip (native popover=hint + CSS anchor positioning) with the
 * Fluent visual contract. */
export const Tooltip = (props: TooltipProps): JSXElement => {
  // Tooltip is the one component that is not wrapped in forwardRef, so its parameter list is
  // part of the emitted public signature — the look props destructure in the body instead.
  const { appearance = 'normal', positioning = 'above', withArrow = false, ...rest } = props;

  const resolved = resolvePositioningShorthand(positioning);

  return renderTooltip(
    useTooltipStyles({
      ...useTooltip({
        ...rest,
        withArrow,
        positioning: { ...resolved, offset: tooltipOffset(resolved.offset, withArrow) },
      }),
      appearance,
    }),
  );
};

Tooltip.displayName = 'Tooltip';

/** Lets trigger utilities clone props through Tooltip. */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
