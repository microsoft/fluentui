import { clsx } from 'clsx';

import { componentMarkers, peerMarker } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { RadioState } from './Radio.types';

import styles from './Radio.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const radioClassNames: { root: string } = {
  root: componentMarkers('radio'),
};

/** Applies the visual contract, returning new state. The headless hook stamps data-disabled and
 * data-label-position and publishes no checked state in either mode, so the indicator and the
 * label read the input's own :checked through the peer marker. The default dot is the indicator's
 * ::after; a consumer's indicator children replace it and fade instead. */
export const useRadioStyles = (state: RadioState): RadioState => {
  const { indicator, label } = state;

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(radioClassNames.root, styles.root, state.root.className),
    },
    input: slotClasses(state.input, styles.input, peerMarker('radio')),
    indicator: slotClasses(
      indicator,
      styles.indicator,
      indicator.children ? styles.customIndicator : styles.defaultIndicator,
    ),
    label: slotClasses(label, styles.label),
  };
};
