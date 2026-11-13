import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { AccordionHeaderState } from './AccordionHeader.types';

import styles from './AccordionHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const accordionHeaderClassNames: { root: string } = {
  root: componentMarkers('accordion-header'),
};

type AccordionHeaderRootDataAttributes = {
  'data-icon'?: true;
  'data-inline'?: true;
  'data-size'?: AccordionHeaderState['size'];
};

/** Applies the visual contract, returning new state. */
export const useAccordionHeaderStyles = (state: AccordionHeaderState): AccordionHeaderState => {
  const root: AccordionHeaderState['root'] & AccordionHeaderRootDataAttributes = {
    ...state.root,
    // The end-position button reclaims the icon slot's leading padding when no icon is supplied.
    'data-icon': state.icon ? true : undefined,
    'data-inline': state.inline || undefined,
    'data-size': state.size,
    className: clsx(accordionHeaderClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    button: slotClasses(state.button, styles.button),
    expandIcon: slotClasses(state.expandIcon, styles.expandIcon),
    icon: slotClasses(state.icon, styles.icon),
  };
};
