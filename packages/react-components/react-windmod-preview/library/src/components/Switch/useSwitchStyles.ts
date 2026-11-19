import { clsx } from 'clsx';

import { componentMarkers, peerMarker } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { SwitchState } from './Switch.types';

import styles from './Switch.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const switchClassNames: { root: string } = {
  root: componentMarkers('switch'),
};

type SwitchRootDataAttributes = {
  'data-size'?: SwitchState['size'];
};

/** Headless stamps data-label-position even without a label slot, so it cannot test label presence.
 * The indicator and label read the native input's :checked through the peer marker. */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
  const { label, labelPosition, size } = state;

  const root: SwitchState['root'] & SwitchRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(switchClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    input: slotClasses(state.input, styles.input, label && styles.anchored, peerMarker('switch')),
    indicator: slotClasses(state.indicator, styles.indicator, label && labelPosition === 'above' && styles.labelAbove),
    label: slotClasses(label, styles.label),
  };
};
