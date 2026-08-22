import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InputState } from './Input.types';

import styles from './Input.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const inputClassNames: { root: string } = {
  root: componentMarkers('input'),
};

type InputRootDataAttributes = {
  'data-size'?: InputState['size'];
  'data-content-before'?: true;
  'data-content-after'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled and data-invalid; data-invalid is deliberately unused, because it is present for
 * every non-boolean aria-invalid token while the invalid look belongs only to `aria-invalid` true.
 * The root's appearance/invalid/disabled looks are module classes because their cascade is carried
 * by block order in Input.module.css. */
export const useInputStyles = (state: InputState): InputState => {
  const { appearance, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root: InputState['root'] & InputRootDataAttributes = {
    ...state.root,
    'data-size': size,
    'data-content-before': !!state.contentBefore || undefined,
    'data-content-after': !!state.contentAfter || undefined,
    className: clsx(
      inputClassNames.root,
      styles.root,
      appearance === 'underline' && styles.underline,
      appearance === 'filled-darker' && styles.filledDarker,
      appearance === 'filled-lighter' && styles.filledLighter,
      filled && styles.filled,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      !disabled && appearance === 'underline' && styles.underlineInteractive,
      !disabled && filled && styles.filledInteractive,
      !disabled && invalid && styles.invalid,
      disabled && styles.disabled,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    input: { ...state.input, className: clsx(styles.input, state.input.className) },
    contentBefore: state.contentBefore && {
      ...state.contentBefore,
      className: clsx(styles.content, state.contentBefore.className),
    },
    contentAfter: state.contentAfter && {
      ...state.contentAfter,
      className: clsx(styles.content, state.contentAfter.className),
    },
  };
};
