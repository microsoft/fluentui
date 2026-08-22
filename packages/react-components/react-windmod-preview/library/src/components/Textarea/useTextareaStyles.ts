import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TextareaState } from './Textarea.types';

import styles from './Textarea.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const textareaClassNames: { root: string } = {
  root: componentMarkers('textarea'),
};

type TextareaRootDataAttributes = {
  'data-size'?: TextareaState['size'];
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled, data-invalid and data-resize; data-invalid is deliberately unused, because it is
 * present for every non-boolean aria-invalid token while the invalid look belongs only to
 * `aria-invalid` true. The root's appearance/invalid/disabled looks and the textarea's resize are
 * module classes because their cascade is carried by block order in Textarea.module.css. */
export const useTextareaStyles = (state: TextareaState): TextareaState => {
  const { appearance, resize, size } = state;
  const disabled = state.textarea.disabled;
  const invalid = `${state.textarea['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root: TextareaState['root'] & TextareaRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      textareaClassNames.root,
      styles.root,
      disabled && styles.disabled,
      !disabled && filled && styles.filled,
      !disabled && appearance === 'filled-darker' && styles.filledDarker,
      !disabled && appearance === 'filled-lighter' && styles.filledLighter,
      !disabled && appearance === 'outline' && styles.outline,
      !disabled && styles.interactive,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      !disabled && invalid && styles.invalid,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    textarea: {
      ...state.textarea,
      className: clsx(
        styles.textarea,
        resize === 'none' && styles.resizeNone,
        resize === 'horizontal' && styles.resizeHorizontal,
        resize === 'vertical' && styles.resizeVertical,
        resize === 'both' && styles.resizeBoth,
        state.textarea.className,
      ),
    },
  };
};
