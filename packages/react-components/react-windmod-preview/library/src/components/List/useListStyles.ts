import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ListState } from './List.types';

import styles from './List.module.css';

export const listClassNames: { root: string } = {
  root: componentMarkers('list'),
};

export const useListStyles = (state: ListState): ListState => ({
  ...state,
  root: { ...state.root, className: clsx(listClassNames.root, styles.root, state.root.className) },
});
