import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { CardHeaderState } from './CardHeader.types';

import styles from './CardHeader.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const cardHeaderClassNames: { root: string } = {
  root: componentMarkers('card-header'),
};

type CardHeaderRootDataAttributes = {
  'data-description'?: true;
};

/** Applies the visual contract, returning new state. The description's presence switches the
 * root between a flex and a three-column grid box model, and the three placed slots read it
 * back through the header's own group marker. */
export const useCardHeaderStyles = (state: CardHeaderState): CardHeaderState => {
  const root: CardHeaderState['root'] & CardHeaderRootDataAttributes = {
    ...state.root,
    'data-description': state.description ? true : undefined,
    className: clsx(cardHeaderClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    image: slotClasses(state.image, styles.image),
    header: slotClasses(state.header, styles.header),
    description: slotClasses(state.description, styles.description),
    action: slotClasses(state.action, styles.action),
  };
};
