import { clsx } from 'clsx';
import type { ToastPosition } from '@fluentui/react-headless-components-preview/toast';

import { componentMarkers } from '../../utils/groupMarker';
import type { ToasterState } from './Toaster.types';
import { toasterOffset } from './toasterOffset';

import styles from './Toaster.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const toasterClassNames: { root: string } = {
  root: componentMarkers('toaster'),
};

type PositionSlot = ToasterState['bottomEnd'];

/**
 * Applies the visual contract, returning new state. The whole look lives on the six position
 * containers: renderToaster never renders `state.root`, so anything written there paints nothing.
 * The offset custom properties are written only for a supplied offset, and the consumer's own
 * style is spread last so it wins.
 */
export const useToasterStyles = (state: ToasterState): ToasterState => {
  const position = (slot: PositionSlot, toastPosition: ToastPosition): PositionSlot => {
    if (!slot) {
      return slot;
    }

    const className = clsx(toasterClassNames.root, styles.position, slot.className);
    const offset = toasterOffset(toastPosition, state.offset);

    if (!offset) {
      return { ...slot, className };
    }

    return { ...slot, className, style: { ...offset, ...slot.style } };
  };

  return {
    ...state,
    bottomStart: position(state.bottomStart, 'bottom-start'),
    bottomEnd: position(state.bottomEnd, 'bottom-end'),
    topStart: position(state.topStart, 'top-start'),
    topEnd: position(state.topEnd, 'top-end'),
    top: position(state.top, 'top'),
    bottom: position(state.bottom, 'bottom'),
  };
};
