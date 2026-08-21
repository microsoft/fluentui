import { clsx } from 'clsx';

import type { LabelState } from './Label.types';

import styles from './Label.module.css';

/** The only public class — the Tailwind named-group marker; internals are hashed idents. */
export const labelClassNames: { root: string } = {
  root: 'group/fui-label',
};

type LabelRootDataAttributes = {
  'data-size'?: LabelState['size'];
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled/-required; data-size is style-only. */
export const useLabelStyles = (state: LabelState): LabelState => {
  const { size, weight } = state;

  const root: LabelState['root'] & LabelRootDataAttributes = {
    ...state.root,
    'data-size': size,
    // Marker never first — see useButtonStyles.
    className: clsx(styles.root, labelClassNames.root, weight === 'semibold' && styles.semibold, state.root.className),
  };

  return {
    ...state,
    root,
    required: state.required && { ...state.required, className: clsx(styles.required, state.required.className) },
  };
};
