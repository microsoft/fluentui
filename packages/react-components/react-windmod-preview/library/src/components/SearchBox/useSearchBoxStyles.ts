'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { useInputStyles } from '../Input/useInputStyles';
import type { SearchBoxState } from './SearchBox.types';

import styles from './SearchBox.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const searchBoxClassNames: { root: string } = {
  root: componentMarkers('search-box'),
};

/**
 * Applies the visual contract on top of Input's, returning new state. The headless hook stamps
 * data-disabled and data-focused; useInputStyles stamps data-size and the two data-content-*
 * attributes, so this hook stamps nothing of its own.
 *
 * Input's input and content rules select through `group/fui-input`, so the root keeps Input's
 * marker pair alongside this component's own.
 */
export const useSearchBoxStyles = (state: SearchBoxState): SearchBoxState => {
  const { root: inputRoot, input, contentBefore, contentAfter } = useInputStyles(state);

  const root: SearchBoxState['root'] = {
    ...inputRoot,
    className: clsx(searchBoxClassNames.root, styles.root, inputRoot.className),
  };

  return {
    ...state,
    root,
    input: { ...input, className: clsx(styles.input, input.className) },
    contentBefore,
    contentAfter: contentAfter && {
      ...contentAfter,
      className: clsx(styles.contentAfter, contentAfter.className),
    },
    dismiss: state.dismiss && {
      ...state.dismiss,
      className: clsx(styles.dismiss, state.dismiss.className),
    },
  };
};
