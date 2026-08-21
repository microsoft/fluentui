import { clsx } from 'clsx';

import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/** The only public class — the named-group marker on the content (Tooltip's only slot). */
export const tooltipClassNames: { root: string } = {
  root: 'group/fui-tooltip',
};

/** Class assembly only: the headless hook stamps data-open/data-placement, the hint
 * popover owns show/hide, and the arrow gets styles.arrow via arrowClassName. */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  return {
    ...state,
    arrowClassName: clsx(styles.arrow, state.arrowClassName),
    content: {
      ...state.content,
      // Marker never first — see useButtonStyles.
      className: clsx(
        styles.content,
        tooltipClassNames.root,
        state.appearance === 'inverted' && styles.inverted,
        state.content.className,
      ),
    },
  };
};
