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
import type { TooltipState } from './Tooltip.types';

import styles from './Tooltip.module.css';

/**
 * Tooltip's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Tooltip__content` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<TooltipSlots>` to `{ root: string }`.
 *
 * The key is `root` even though `TooltipSlots` declares no `root` slot. Tooltip renders into
 * a portal and its `content` element is its outermost node, so that is where the marker rides
 * (D15.1) and `root` names the element the identity class actually lands on. Migration is a
 * rename plus an escape: a template selector built from `tooltipClassNames.content` becomes
 * `fuiSelector(tooltipClassNames.root)`, resolving to the same element.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + tooltipClassNames.root` is invalid CSS. Use
 * `fuiSelector(tooltipClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
};

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  const content = state.content as TooltipState['content'] & TooltipContentDataAttributes;

  content['data-open'] = state.visible || undefined;

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.content` is unconditional, so index 0 is always the hashed,
  // selector-safe `fuicm-*` token — which is what keeps the marker off `classList[0]`, where
  // nwsapi's `:scope` polyfill would throw on its `/` under jsdom (D15.1). The BEM static
  // that used to lead this call is gone (D16.1): the marker is now Tooltip's SOLE public
  // identity class, and the only handle by which another module can style an element from
  // this Tooltip's state, because `styles.content` is hashed and unaddressable from outside
  // this file (DECISIONS.md D15).
  //
  // It goes on `content` rather than a root because Tooltip HAS no root slot: `TooltipSlots`
  // declares `content` alone, the tooltip renders into a portal, and the content element is
  // therefore its outermost node — it is also the element that carries `data-open`, which is
  // the state a descendant would want to read. The marker uses the component's own name
  // (`group/fui-tooltip`), not a slot name, and `tooltipClassNames.root` resolves to it.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Tooltip.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.content.className = clsx(
    styles.content,
    'group/fui-tooltip',
    state.appearance === 'inverted' && styles.inverted,
    state.content.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
