import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/** The only public classes — see componentMarkers; the content is Tooltip's only slot. */
export const tooltipClassNames: { root: string } = {
  root: componentMarkers('tooltip'),
};

/** Class assembly only: the headless hook stamps data-open/data-placement, the hint
 * popover owns show/hide, and the arrow gets styles.arrow via arrowClassName. */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  return {
    ...state,
    arrowClassName: clsx(styles.arrow, state.arrowClassName),
    content: {
      ...state.content,
      className: clsx(
        tooltipClassNames.root,
        styles.content,
        state.appearance === 'inverted' && styles.inverted,
        state.content.className,
      ),
    },
  };
};
