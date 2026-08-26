import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InfoLabelState } from './InfoLabel.types';

import styles from './InfoLabel.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const infoLabelClassNames: { root: string } = {
  root: componentMarkers('info-label'),
};

/**
 * Applies the visual contract, returning new state. The root has no bucket of its own; the
 * size-keyed rules reach their element through the info button's own data-size stamp.
 */
export const useInfoLabelStyles = (state: InfoLabelState): InfoLabelState => {
  return {
    ...state,
    root: { ...state.root, className: clsx(infoLabelClassNames.root, state.root.className) },
    label: { ...state.label, className: clsx(styles.label, state.label.className) },
    infoButton: state.infoButton && {
      ...state.infoButton,
      className: clsx(styles.infoButton, state.infoButton.className),
    },
  };
};
