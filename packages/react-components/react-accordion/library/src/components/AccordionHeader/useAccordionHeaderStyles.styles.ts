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
