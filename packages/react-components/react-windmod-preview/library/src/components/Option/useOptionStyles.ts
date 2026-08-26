import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { OptionState } from './Option.types';

import styles from './Option.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const optionClassNames: { root: string } = {
  root: componentMarkers('option'),
};

/**
 * Applies the visual contract, returning new state. Eleven Griffel buckets collapse to two classes
 * because the headless hook already stamps data-selected, data-multiselect and data-disabled: the
 * selection, mode and disabled looks are all reached from CSS through those attributes.
 */
export const useOptionStyles = (state: OptionState): OptionState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(optionClassNames.root, styles.root, state.root.className),
  },
  checkIcon: slotClasses(state.checkIcon, styles.checkIcon),
});
