import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ListboxState } from './Listbox.types';

import styles from './Listbox.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const listboxClassNames: { root: string } = {
  root: componentMarkers('listbox'),
};

/**
 * Applies the visual contract, returning new state. The popup-surface look (shadow, radius,
 * max-height) is not authored here: Griffel keeps it on the Combobox's `listbox` bucket, and
 * windmod keeps that split — see useComboboxStyles.
 */
export const useListboxStyles = (state: ListboxState): ListboxState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(listboxClassNames.root, styles.root, state.root.className),
  },
});
