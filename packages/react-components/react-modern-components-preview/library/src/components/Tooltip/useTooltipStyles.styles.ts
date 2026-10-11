import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import styles from './Tooltip.module.css';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

/**
 * Apply styling to the Tooltip slots based on the state.
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  state.content.className = clsx(tooltipClassNames.content, styles.content, state.content.className);
  state.arrowClassName = styles.arrow;

  return state;
};
