import { clsx } from 'clsx';
import type { AccordionHeaderState } from './AccordionHeader.types';

import styles from './AccordionHeader.module.css';

/**
 * AccordionHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, accordionHeaderClassNames.root, state.root.className);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.button.className = clsx(styles.button, state.button.className);

  if (state.expandIcon) {
    state.expandIcon.className = clsx(styles['expand-icon'], state.expandIcon.className);
  }
  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }
  return state;
};
