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
import type { AccordionHeaderSlots, AccordionHeaderState } from './AccordionHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './AccordionHeader.module.css';

export const accordionHeaderClassNames: SlotClassNames<AccordionHeaderSlots> = {
  root: 'fui-AccordionHeader',
  button: 'fui-AccordionHeader__button',
  expandIcon: 'fui-AccordionHeader__expandIcon',
  icon: 'fui-AccordionHeader__icon',
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

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this header's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Read it as
  // `@variant group-disabled/fui-accordion-header { … }` (DECISIONS.md D15). Only the root
  // slot carries a marker: a group cannot style itself, so one on `button` or `expandIcon`
  // would only serve those slots' own descendants.
  //
  // Cascade priority is decided by the `@layer fui.*` order in AccordionHeader.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(
    accordionHeaderClassNames.root,
    'group/fui-accordion-header',
    styles.root,
    state.root.className,
  );

  state.button.className = clsx(accordionHeaderClassNames.button, styles.button, state.button.className);

  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      accordionHeaderClassNames.expandIcon,
      styles['expand-icon'],
      state.expandIcon.className,
    );
  }
  if (state.icon) {
    state.icon.className = clsx(accordionHeaderClassNames.icon, styles.icon, state.icon.className);
  }
  return state;
};
