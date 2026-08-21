'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { renderTooltip, useTooltip } from '@fluentui/react-headless-components-preview/tooltip';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { TooltipProps, TooltipState } from './Tooltip.types';
import { useTooltipStyles } from './useTooltipStyles';

/** Griffel parity: base offset 4; withArrow adds the 6px arrow height (pairs with the
 * 8.484px/−4.242px constants in Tooltip.module.css). */
const TOOLTIP_OFFSET = 4;
const ARROW_HEIGHT = 6;

/** Tooltip: the headless tooltip (native popover=hint + CSS anchor positioning) with the
 * Fluent visual contract. */
export const Tooltip = (props: TooltipProps): JSXElement => {
  const { appearance = 'normal', positioning = 'above', withArrow = false, ...rest } = props;

  const resolved = resolvePositioningShorthand(positioning);
  const offset =
    resolved.offset === undefined
      ? TOOLTIP_OFFSET + (withArrow ? ARROW_HEIGHT : 0)
      : typeof resolved.offset === 'number' && withArrow
        ? resolved.offset + ARROW_HEIGHT
        : resolved.offset;

  const state: TooltipState = {
    ...useTooltip({ ...rest, withArrow, positioning: { ...resolved, offset } }),
    appearance,
  };

  return renderTooltip(useTooltipStyles(state));
};

Tooltip.displayName = 'Tooltip';

/** Lets trigger utilities clone props through Tooltip. */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
