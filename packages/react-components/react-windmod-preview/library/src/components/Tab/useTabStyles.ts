import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { TabState } from './Tab.types';

import styles from './Tab.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tabClassNames: { root: string } = {
  root: componentMarkers('tab'),
};

type TabRootDataAttributes = {
  'data-appearance'?: TabState['appearance'];
  'data-size'?: TabState['size'];
  'data-orientation'?: 'horizontal' | 'vertical';
  'data-icon'?: true;
};

/**
 * Applies the visual contract, returning new state. Orientation is stamped here because the
 * headless Tab publishes `vertical` on its state but no attribute for it, and the module selects
 * on it; the list's own root carries the same enumerated spelling.
 */
export const useTabStyles = (state: TabState): TabState => {
  const root: TabState['root'] & TabRootDataAttributes = {
    ...state.root,
    'data-appearance': state.appearance,
    'data-size': state.size,
    'data-orientation': state.vertical ? 'vertical' : 'horizontal',
    'data-icon': state.icon ? true : undefined,
    className: clsx(tabClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
    content: slotClasses(state.content, styles.content),
    // Griffel appends the CONTENT slot's className here, not the reserved slot's.
    contentReservedSpace: state.contentReservedSpace && {
      ...state.contentReservedSpace,
      className: clsx(styles.contentReservedSpace, state.content.className),
    },
  };
};
