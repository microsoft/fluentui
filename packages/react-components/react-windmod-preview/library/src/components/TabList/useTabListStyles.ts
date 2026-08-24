import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TabListState } from './TabList.types';

import styles from './TabList.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tabListClassNames: { root: string } = {
  root: componentMarkers('tab-list'),
};

type TabListRootDataAttributes = {
  'data-appearance'?: TabListState['appearance'];
  'data-size'?: TabListState['size'];
};

/** Applies the visual contract, returning new state. */
export const useTabListStyles = (state: TabListState): TabListState => {
  const root: TabListState['root'] & TabListRootDataAttributes = {
    ...state.root,
    'data-appearance': state.appearance,
    'data-size': state.size,
    className: clsx(tabListClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
