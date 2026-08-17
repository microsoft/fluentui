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
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, accordionPanelClassNames.root, state.root.className);

  return state;
};
