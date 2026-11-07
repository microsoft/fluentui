import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { LinkState } from './Link.types';

import styles from './Link.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const linkClassNames: { root: string } = {
  root: componentMarkers('link'),
};

type LinkRootDataAttributes = {
  'data-appearance'?: LinkState['appearance'];
  'data-inline'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled/-disabled-focusable, both derived from a `disabled` that is already the OR of
 * `disabled` and `disabledFocusable`; these two are style-only. The element-type classes must
 * read `state.root` after the headless hook has stripped `href` from a disabled anchor. */
export const useLinkStyles = (state: LinkState): LinkState => {
  const { appearance, inline } = state;

  const root: LinkState['root'] & LinkRootDataAttributes = {
    ...state.root,
    'data-appearance': appearance,
    'data-inline': inline || undefined,
    className: clsx(
      linkClassNames.root,
      styles.root,
      state.root.as === 'a' && state.root.href && styles.href,
      state.root.as === 'button' && styles.button,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
  };
};
