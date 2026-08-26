import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InfoButtonSize, InfoButtonState } from './InfoButton.types';

import styles from './InfoButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const infoButtonClassNames: { root: string } = {
  root: componentMarkers('info-button'),
};

type InfoButtonRootDataAttributes = {
  'data-size'?: InfoButtonState['size'];
};

/** Keyed off the button's own size, never off the surface's: a consumer may set the popover's
 * size directly, and Griffel still resolves the typography from the button. */
const infoTypographyClass = (size: InfoButtonSize): string => {
  if (size === 'large') {
    return styles.infoLarge;
  }
  return styles.infoSmallMedium;
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open,
 * which is the whole open/selected channel; data-size is style-only.
 */
export const useInfoButtonStyles = (state: InfoButtonState): InfoButtonState => {
  const { size } = state;

  const root: InfoButtonState['root'] & InfoButtonRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(infoButtonClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    info: {
      ...state.info,
      className: clsx(styles.info, infoTypographyClass(size), state.info.className),
    },
  };
};
