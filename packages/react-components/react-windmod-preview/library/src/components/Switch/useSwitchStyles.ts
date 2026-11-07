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

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-checked/-disabled/-disabled-focusable/-label-position — data-label-position on every Switch
 * whether or not a label slot is present, so it is never a label-presence test, and data-checked
 * only in controlled mode, so it is never a checked test either: the indicator and label read the
 * input's own :checked through the peer marker. `data-size` is style-only. */
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
