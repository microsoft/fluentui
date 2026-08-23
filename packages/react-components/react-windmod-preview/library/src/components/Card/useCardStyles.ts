import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { CardState } from './Card.types';

import styles from './Card.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const cardClassNames: { root: string } = {
  root: componentMarkers('card'),
};

type CardRootDataAttributes = {
  'data-appearance'?: CardState['appearance'];
  'data-orientation'?: CardState['orientation'];
  'data-size'?: CardState['size'];
  'data-interactive'?: true;
};

/** Applies the visual contract, returning new state. `filled` is the base look and carries no
 * class. `data-interactive` is read by CardFooter and CardPreview, so it must be an attribute;
 * the two focus classes are chosen in JS because no CSS rule can select on `selectFocused`. */
export const useCardStyles = (state: CardState): CardState => {
  const { appearance, disabled, interactive, orientation, selectable, selectFocused, size } = state;

  // Griffel's own gate: the interactive look is suppressed on a disabled card.
  const isSelectableOrInteractive = !disabled && (interactive || selectable);
  const focusedClassName = disabled
    ? undefined
    : selectable
      ? selectFocused && styles['selectable-focused']
      : styles.focused;

  const root: CardState['root'] & CardRootDataAttributes = {
    ...state.root,
    'data-appearance': appearance,
    'data-orientation': orientation,
    'data-size': size,
    'data-interactive': isSelectableOrInteractive || undefined,
    className: clsx(cardClassNames.root, styles.root, focusedClassName, state.root.className),
  };

  return {
    ...state,
    root,
    floatingAction: state.floatingAction && {
      ...state.floatingAction,
      className: clsx(styles['floating-action'], state.floatingAction.className),
    },
    checkbox: state.checkbox && { ...state.checkbox, className: clsx(styles.checkbox, state.checkbox.className) },
  };
};
