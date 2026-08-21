import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { LabelState } from './Label.types';

import styles from './Label.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const labelClassNames: { root: string } = {
  root: componentMarkers('label'),
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
    className: clsx(labelClassNames.root, styles.root, weight === 'semibold' && styles.semibold, state.root.className),
  };

  return {
    ...state,
    root,
    required: state.required && { ...state.required, className: clsx(styles.required, state.required.className) },
  };
};
