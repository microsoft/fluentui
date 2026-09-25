import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { SpinnerState } from './Spinner.types';

import styles from './Spinner.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const spinnerClassNames: { root: string } = {
  root: componentMarkers('spinner'),
};

type SpinnerRootDataAttributes = {
  'data-appearance'?: SpinnerState['appearance'];
  'data-size'?: SpinnerState['size'];
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-label-position, on every Spinner whether or not a label slot is present, so it is
 * never a label-presence test. `spinnerTail` is always resolved but still types as optional,
 * so its guard is required. `primary` is the base look and carries no class. */
export const useSpinnerStyles = (state: SpinnerState): SpinnerState => {
  const { appearance, size } = state;

  const root: SpinnerState['root'] & SpinnerRootDataAttributes = {
    ...state.root,
    'data-appearance': appearance,
    'data-size': size,
    className: clsx(spinnerClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    spinner: slotClasses(state.spinner, styles.spinner),
    spinnerTail: slotClasses(state.spinnerTail, styles.tail),
    label: slotClasses(state.label, styles.label),
  };
};
