'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Tooltip.module.css';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

/**
 * Data attributes rendered on the content slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `data-open` is the headless preview's name for "this surface is showing"
 * (reports/headless-precedent.md) and its `open` variant already exists in the catalog, so
 * converting Tooltip's `visible` state adds no new vocabulary. It is a *presence* selector,
 * so the flag is written `visible || undefined` — React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-open="false"` and still match `[data-open]`.
 *
 * The attribute is required rather than cosmetic: `shouldRenderTooltip` is forced true for
 * `relationship="description"` and for label tooltips with non-string content, so a hidden
 * tooltip is still in the DOM and has to keep Griffel's `display: none`.
 */
type TooltipContentDataAttributes = {
  'data-open'?: true;
};

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  const content = state.content as TooltipState['content'] & TooltipContentDataAttributes;

  content['data-open'] = state.visible || undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Tooltip.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.content.className = clsx(
    tooltipClassNames.content,
    styles.content,
    state.appearance === 'inverted' && styles.inverted,
    state.content.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
