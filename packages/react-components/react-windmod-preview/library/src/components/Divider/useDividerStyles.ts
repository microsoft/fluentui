import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { DividerState } from './Divider.types';

import styles from './Divider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dividerClassNames: { root: string } = {
  root: componentMarkers('divider'),
};

type DividerRootDataAttributes = {
  'data-align-content'?: DividerState['alignContent'];
  'data-inset'?: true;
  'data-empty'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-orientation; these three are style-only. `data-empty` must test `=== undefined` —
 * renderDivider gates the wrapper on the identical comparison, so a falsiness test would
 * diverge for `children=""` and `children={0}`. The wrapper slot carries no styles. */
export const useDividerStyles = (state: DividerState): DividerState => {
  const { alignContent, appearance, inset } = state;

  const root: DividerState['root'] & DividerRootDataAttributes = {
    ...state.root,
    'data-align-content': alignContent,
    'data-inset': inset || undefined,
    'data-empty': state.root.children === undefined || undefined,
    className: clsx(dividerClassNames.root, styles.root, styles[appearance], state.root.className),
  };

  return {
    ...state,
    root,
  };
};
