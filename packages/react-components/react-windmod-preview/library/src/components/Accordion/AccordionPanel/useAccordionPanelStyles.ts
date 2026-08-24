import { clsx } from 'clsx';

import { componentMarkers } from '../../../utils/groupMarker';
import type { AccordionPanelState } from './AccordionPanel.types';

import styles from './AccordionPanel.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const accordionPanelClassNames: { root: string } = {
  root: componentMarkers('accordion-panel'),
};

/** Applies the visual contract, returning new state. */
export const useAccordionPanelStyles = (state: AccordionPanelState): AccordionPanelState => ({
  ...state,
  root: { ...state.root, className: clsx(accordionPanelClassNames.root, styles.root, state.root.className) },
});
