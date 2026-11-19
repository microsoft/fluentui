import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import arrowStyles from '@fluentui/react-positioning/arrow.module.css';
import styles from './Tooltip.module.css';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  state.content.className = clsx(
    tooltipClassNames.content,
    styles.content,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.hidden && styles.hidden,
    state.content.className,
  );
  state.arrowClassName = clsx(arrowStyles.arrow, styles.arrow);
  return state;
};
