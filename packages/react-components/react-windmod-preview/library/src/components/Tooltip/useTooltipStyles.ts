import { clsx } from 'clsx';

import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/**
 * Public identity class for Tooltip — the Tailwind named-group marker on the content
 * surface (Tooltip's only slot). The only public class; everything else is a hashed
 * CSS Modules ident.
 */
export const tooltipClassNames: { root: string } = {
  root: 'group/fui-tooltip',
};

/**
 * Applies the Fluent visual contract to the headless Tooltip state.
 *
 * Visibility needs no class work: the content is a native `popover="hint"` element, so
 * the top layer controls display, and the headless hook already stamps `data-open` and
 * `data-placement` on the content for state/placement selectors (the arrow is the
 * `[data-arrow]` child, styled from the content's module rules).
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi's :scope
  // polyfill throws on the `/`), consumer className LAST so consumer overrides win.
  state.content.className = clsx(
    styles.content,
    tooltipClassNames.root,
    state.appearance === 'inverted' && styles.inverted,
    state.content.className,
  );

  return state;
};
