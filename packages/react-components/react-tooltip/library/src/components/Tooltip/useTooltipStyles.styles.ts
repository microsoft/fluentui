import { clsx } from 'clsx';
import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/**
 * Tooltip's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The key is `root` even though `TooltipSlots` declares no `root` slot. Tooltip renders into
 * a portal and its `content` element is its outermost node, so that is where the marker rides
 * (D15.1) and `root` names the element the identity class actually lands on. Migration is a
 * rename plus an escape: a template selector built from `tooltipClassNames.content` becomes
 * `fuiSelector(tooltipClassNames.root)`, resolving to the same element.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tooltipClassNames: { root: string } = {
  root: 'group/fui-tooltip',
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
  'data-hidden'?: true;
};

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  const content = state.content as TooltipState['content'] & TooltipContentDataAttributes;

  content['data-open'] = state.visible || undefined;

  // Presence selector like `data-open`: `|| undefined` so React omits the attribute rather
  // than rendering `data-hidden="false"`, which `[data-hidden]` would still match.
  content['data-hidden'] = state.hidden || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.content.className = clsx(
    styles.content,
    tooltipClassNames.root,
    state.appearance === 'inverted' && styles.inverted,
    state.content.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
