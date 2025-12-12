'use client';

import type { TooltipSlots, TooltipState } from './Tooltip.types';
import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

const tooltipArrowClassName = 'fui-Tooltip__arrow';

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  'use no memo';

  const { arrowRef, children, mountNode, ...componentState } = state;

  state.content.className = getComponentSlotClassName(tooltipClassNames.content, state.content, componentState);

  state.arrowClassName = tooltipArrowClassName;

  return state;
};
