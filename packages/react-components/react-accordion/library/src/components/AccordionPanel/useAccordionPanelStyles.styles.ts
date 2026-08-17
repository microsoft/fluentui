import { clsx } from 'clsx';

import type { AccordionPanelState } from './AccordionPanel.types';

import styles from './AccordionPanel.module.css';

/**
 * AccordionPanel's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const accordionPanelClassNames: { root: string } = {
  root: 'group/fui-accordion-panel',
};

/** Applies style classnames to slots */
export const useAccordionPanelStyles_unstable = (state: AccordionPanelState): AccordionPanelState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-accordion-panel` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-AccordionPanel` static held that position; `styles.root` holds it now.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `accordionPanelClassNames` — and is the only handle by which another module, in
  // this package or any other, can style an element from this panel's state, because
  // `styles.root` is hashed and unaddressable from outside this file. Read it as
  // `@variant group-…/fui-accordion-panel { … }` (DECISIONS.md D15).
  //
  // Cascade priority is decided by the `@layer fui.*` order in AccordionPanel.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, accordionPanelClassNames.root, state.root.className);

  return state;
};
