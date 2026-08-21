import { clsx } from 'clsx';

import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/**
 * Public identity class for Tooltip — the Tailwind named-group marker on the content
 * surface (Tooltip's only slot), and the ONLY public class.
 */
export const tooltipClassNames: { root: string } = {
  root: 'group/fui-tooltip',
};

/**
 * Applies the Fluent visual contract, returning new state (no slot mutation). Only class
 * assembly happens here: the headless hook already stamps `data-open` and `data-placement`
 * on the content, the native `popover="hint"` top layer owns show/hide, and the arrow is
 * the class-less `[data-arrow]` child styled from Tooltip.module.css.
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  return {
    ...state,
    content: {
      ...state.content,
      // Module class FIRST (a group marker as classList[0] breaks nwsapi's :scope
      // polyfill), consumer className LAST so consumer overrides win.
      className: clsx(
        styles.content,
        tooltipClassNames.root,
        state.appearance === 'inverted' && styles.inverted,
        state.content.className,
      ),
    },
  };
};
