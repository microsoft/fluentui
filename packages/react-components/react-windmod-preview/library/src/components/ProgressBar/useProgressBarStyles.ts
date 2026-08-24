import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ProgressBarState } from './ProgressBar.types';

import styles from './ProgressBar.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const progressBarClassNames: { root: string } = {
  root: componentMarkers('progress-bar'),
};

/** Below this `value` the width change is not transitioned, so a reset to zero does not
 * animate. The comparison is against `value` itself, never its ratio to `max`. */
const ZERO_THRESHOLD = 0.01;

/**
 * Applies the visual contract, returning new state. The determinate bar's inline width and the
 * root's data-indeterminate are both stamped by the headless hook; the bar's indeterminate block
 * selects on that attribute through the marker group. Colour is ignored while indeterminate.
 */
export const useProgressBarStyles = (state: ProgressBarState): ProgressBarState => {
  const { color, shape, thickness, value } = state;

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(progressBarClassNames.root, styles.root, styles[shape], styles[thickness], state.root.className),
    },
    bar: state.bar && {
      ...state.bar,
      className: clsx(
        styles.bar,
        styles[value === undefined ? 'brand' : color],
        value !== undefined && value > ZERO_THRESHOLD && styles.nonZeroDeterminate,
        state.bar.className,
      ),
    },
  };
};
