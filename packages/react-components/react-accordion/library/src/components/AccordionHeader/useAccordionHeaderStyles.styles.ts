import { clsx } from 'clsx';
import type { AccordionHeaderState } from './AccordionHeader.types';

import styles from './AccordionHeader.module.css';

/**
 * AccordionHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `accordionClassNames` in
 * `../Accordion/useAccordionStyles.styles.ts` for the full rationale, including why this is
 * not tagged `@deprecated`. The `button` / `expandIcon` / `icon` keys are gone along with the
 * `fui-AccordionHeader*` BEM statics (D16.1): style those slots through their `className`
 * props. The value is a class TOKEN — use `fuiSelector(accordionHeaderClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const accordionHeaderClassNames: { root: string } = {
  root: 'group/fui-accordion-header',
};

/**
 * Data attributes rendered on the root slot.
 *
 * All five live on the ROOT even though most of them select styles for the `button` and
 * `expandIcon` slots: those slots are the root's descendants, so one stamp drives every
 * descendant rule (the same approach as react-button's `data-size` → `.root … & .icon`).
 *
 * `data-size` / `data-inline` / `data-disabled` are matched by the shared
 * `@custom-variant` catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 * `data-expand-icon-position` and `data-icon` have no catalog entry yet, so
 * `AccordionHeader.module.css` matches them with raw attribute selectors — the cookbook
 * bans variant DEFINITIONS in modules, not attribute selectors.
 * `data-expand-icon-position` is one of the headless preview's 25 attribute names
 * (reports/headless-precedent.md); its own AccordionHeader stamps exactly this name and
 * value space.
 *
 * `data-inline` / `data-disabled` / `data-icon` are *presence* selectors, so the flags
 * are written as `flag || undefined` — React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-inline="false"` and still match
 * `[data-inline]`. `data-icon` carries the `!state.icon` half of the
 * `buttonExpandIconEndNoIcon` condition; `data-disabled` carries `state.disabled`, which
 * is NOT the same as the `<button>`'s own `disabled` attribute (react-aria drops that one
 * for `disabledFocusable`).
 */
type AccordionHeaderRootDataAttributes = {
  'data-size': AccordionHeaderState['size'];
  'data-expand-icon-position': AccordionHeaderState['expandIconPosition'];
  'data-inline'?: true;
  'data-disabled'?: true;
  'data-icon'?: true;
};

/** Applies style classnames to slots */
export const useAccordionHeaderStyles_unstable = (state: AccordionHeaderState): AccordionHeaderState => {
  const { disabled, expandIconPosition, inline, size } = state;

  const root = state.root as AccordionHeaderState['root'] & AccordionHeaderRootDataAttributes;

  root['data-size'] = size;
  root['data-expand-icon-position'] = expandIconPosition;
  root['data-inline'] = inline || undefined;
  root['data-disabled'] = disabled || undefined;
  root['data-icon'] = Boolean(state.icon) || undefined;

  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-accordion-header` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-AccordionHeader` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `accordionHeaderClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from this header's state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-disabled/fui-accordion-header { … }` (DECISIONS.md D15). Only the root
  // slot carries a marker: a group cannot style itself, so one on `button` or `expandIcon`
  // would only serve those slots' own descendants.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AccordionHeader.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, accordionHeaderClassNames.root, state.root.className);

  // Sub-slots carry no marker, so D15.1 is not in play: the hashed module class simply leads
  // and the consumer className stays last (DECISIONS.md D16.1 — no public class-name handle
  // on component internals).
  state.button.className = clsx(styles.button, state.button.className);

  if (state.expandIcon) {
    state.expandIcon.className = clsx(styles['expand-icon'], state.expandIcon.className);
  }
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }
  return state;
};
