import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
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
    image: state.image && { ...state.image, className: clsx(styles.image, state.image.className) },
    header: state.header && { ...state.header, className: clsx(styles.header, state.header.className) },
    description: state.description && {
      ...state.description,
      className: clsx(styles.description, state.description.className),
    },
    action: state.action && { ...state.action, className: clsx(styles.action, state.action.className) },
  };
};
