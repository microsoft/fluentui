import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { FieldState } from './Field.types';

import styles from './Field.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const fieldClassNames: { root: string } = {
  root: componentMarkers('field'),
};

type FieldRootDataAttributes = {
  'data-orientation'?: FieldState['orientation'];
  'data-size'?: FieldState['size'];
};

/**
 * Applies the visual contract, returning new state. The headless hook stamps
 * data-validate-state on the root; the label, message and icon read it through group variants,
 * so the only stamps added here are the two look props CSS selects on. The icon gutter stays a
 * JS-gated class because slot presence is state, not a DOM condition.
 */
export const useFieldStyles = (state: FieldState): FieldState => {
  const { orientation, size } = state;
  const horizontal = orientation === 'horizontal';

  const root: FieldState['root'] & FieldRootDataAttributes = {
    ...state.root,
    'data-orientation': orientation,
    'data-size': size,
    className: clsx(
      fieldClassNames.root,
      styles.root,
      horizontal && !state.label && styles.horizontalNoLabel,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    label: state.label && { ...state.label, className: clsx(styles.label, state.label.className) },
    validationMessage: state.validationMessage && {
      ...state.validationMessage,
      className: clsx(
        styles.secondaryText,
        styles.validationMessage,
        state.validationMessageIcon && styles.withIcon,
        state.validationMessage.className,
      ),
    },
    validationMessageIcon: state.validationMessageIcon && {
      ...state.validationMessageIcon,
      className: clsx(styles.validationMessageIcon, state.validationMessageIcon.className),
    },
    hint: state.hint && { ...state.hint, className: clsx(styles.secondaryText, state.hint.className) },
  };
};
