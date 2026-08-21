'use client';

import type { FluentTriggerComponent, JSXElement } from '@fluentui/react-utilities';
import { renderTooltip, useTooltip } from '@fluentui/react-headless-components-preview/tooltip';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { TooltipProps, TooltipState } from './Tooltip.types';
import { useTooltipStyles } from './useTooltipStyles';

/**
 * Griffel-parity constants: the classic Tooltip positions at offset 4, and with an arrow
 * react-positioning's `mergeArrowOffset` added the 6px arrow height (4 + 6 = 10). The
 * headless `usePositioning` applies offsets as margins and does no arrow arithmetic, so
 * the same numbers are applied here. The 6px height also drives the CSS constants in
 * Tooltip.module.css (8.484px diagonal / -4.242px edge offset) — change them together.
 */
const TOOLTIP_OFFSET = 4;
const ARROW_HEIGHT = 6;

/**
 * Tooltip renders a non-modal floating label or description anchored to a trigger
 * element. Windmod Tooltip: the headless tooltip (native `popover="hint"` top layer +
 * CSS anchor positioning) decorated with the Fluent visual contract.
 */
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

  useTooltipStyles(state);

  return renderTooltip(state);
};

Tooltip.displayName = 'Tooltip';

/**
 * Marks the Tooltip component as a FluentTriggerComponent so trigger utilities clone
 * props through it. Type-cast to avoid exposing internal types in the public API.
 */
(Tooltip as FluentTriggerComponent).isFluentTriggerComponent = true;
