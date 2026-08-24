import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { AccordionItemState } from './AccordionItem.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const accordionItemClassNames: { root: string } = {
  root: componentMarkers('accordion-item'),
};

/**
 * Applies the visual contract, returning new state. Griffel's AccordionItem authors no rules, so
 * there is no stylesheet of its own — the marker pair is the whole contract.
 */
export const useAccordionItemStyles = (state: AccordionItemState): AccordionItemState => ({
  ...state,
  root: { ...state.root, className: clsx(accordionItemClassNames.root, state.root.className) },
});
