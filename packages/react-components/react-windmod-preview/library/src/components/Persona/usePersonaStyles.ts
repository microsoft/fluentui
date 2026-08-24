import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { PersonaState } from './Persona.types';

import styles from './Persona.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const personaClassNames: { root: string } = {
  root: componentMarkers('persona'),
};

type PersonaRootDataAttributes = {
  'data-size'?: PersonaState['size'];
  'data-text-alignment'?: PersonaState['textAlignment'];
};

/**
 * Applies the visual contract, returning new state. The headless hook stamps data-text-position on
 * the root; every child slot reads all three root attributes through group variants, so the only
 * stamps added here are the two look props CSS selects on.
 *
 * The three optional text lines share one look class and differ only in where they start, so each
 * carries the shared class plus its own.
 */
export const usePersonaStyles = (state: PersonaState): PersonaState => {
  const { size, textAlignment } = state;

  const root: PersonaState['root'] & PersonaRootDataAttributes = {
    ...state.root,
    'data-size': size,
    'data-text-alignment': textAlignment,
    className: clsx(personaClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    avatar: state.avatar && { ...state.avatar, className: clsx(styles.avatar, state.avatar.className) },
    primaryText: state.primaryText && {
      ...state.primaryText,
      className: clsx(styles.primaryText, state.primaryText.className),
    },
    secondaryText: state.secondaryText && {
      ...state.secondaryText,
      className: clsx(styles.optionalText, styles.secondaryText, state.secondaryText.className),
    },
    tertiaryText: state.tertiaryText && {
      ...state.tertiaryText,
      className: clsx(styles.optionalText, styles.tertiaryText, state.tertiaryText.className),
    },
    quaternaryText: state.quaternaryText && {
      ...state.quaternaryText,
      className: clsx(styles.optionalText, styles.quaternaryText, state.quaternaryText.className),
    },
  };
};
