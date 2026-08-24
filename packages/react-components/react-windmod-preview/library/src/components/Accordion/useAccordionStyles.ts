import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { AccordionState } from './Accordion.types';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const accordionClassNames: { root: string } = {
  root: componentMarkers('accordion'),
};

/**
 * Applies the visual contract, returning new state. Griffel's Accordion authors no rules at all,
 * and the base typography and text colour every panel paints come from FluentProvider, so this
 * component ships no stylesheet of its own.
 */
export const useAccordionStyles = (state: AccordionState): AccordionState => ({
  ...state,
  root: { ...state.root, className: clsx(accordionClassNames.root, state.root.className) },
});
