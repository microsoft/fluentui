import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { OptionGroupState } from './OptionGroup.types';

import styles from './OptionGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const optionGroupClassNames: { root: string } = {
  root: componentMarkers('option-group'),
};

/** Applies the visual contract, returning new state. */
export const useOptionGroupStyles = (state: OptionGroupState): OptionGroupState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(optionGroupClassNames.root, styles.root, state.root.className),
  },
  label: slotClasses(state.label, styles.label),
});
