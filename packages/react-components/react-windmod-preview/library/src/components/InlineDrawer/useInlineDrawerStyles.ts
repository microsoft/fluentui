import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { InlineDrawerState } from './InlineDrawer.types';

import styles from './InlineDrawer.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const inlineDrawerClassNames: { root: string } = {
  root: componentMarkers('inline-drawer'),
};

type InlineDrawerRootDataAttributes = {
  'data-size'?: InlineDrawerState['size'];
  'data-separator'?: true;
};

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open and
 * data-position; data-size and data-separator are this layer's, and the module selects on both.
 */
export const useInlineDrawerStyles = (state: InlineDrawerState): InlineDrawerState => {
  const root: InlineDrawerState['root'] & InlineDrawerRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    'data-separator': state.separator || undefined,
    className: clsx(inlineDrawerClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
