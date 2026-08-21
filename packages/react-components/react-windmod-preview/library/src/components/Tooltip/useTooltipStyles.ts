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
 * on the content for CSS state selectors, and the native `popover="hint"` top layer owns
 * show/hide. The arrow gets `styles.arrow` via `arrowClassName`; its per-placement rules
 * key off the content's group marker (`group-placement-*\/fui-tooltip` variants).
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  return {
    ...state,
    arrowClassName: clsx(styles.arrow, state.arrowClassName),
    content: {
      ...state.content,
      // Class order: module class, group marker, consumer className. The marker contains
      // a '/' (Tailwind named-group syntax) and must never be classList[0]: jsdom's
      // selector engine (nwsapi) builds its :scope polyfill from the first class without
      // escaping, so a leading '/' class makes element.matches() throw in tests.
      // Consumer-last is convention — overrides win via cascade layers, not class order.
      className: clsx(
        styles.content,
        tooltipClassNames.root,
        state.appearance === 'inverted' && styles.inverted,
        state.content.className,
      ),
    },
  };
};
