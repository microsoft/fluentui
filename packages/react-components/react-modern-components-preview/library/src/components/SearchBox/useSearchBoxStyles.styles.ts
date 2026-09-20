'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useInputStyles } from '../Input/useInputStyles.styles';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import styles from './SearchBox.module.css';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  dismiss: 'fui-SearchBox__dismiss',
  contentAfter: 'fui-SearchBox__contentAfter',
  contentBefore: 'fui-SearchBox__contentBefore',
  input: 'fui-SearchBox__input',
};

export const useSearchBoxStyles = (state: SearchBoxState): SearchBoxState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(searchBoxClassNames.root, styles.root, state.root.className);
  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(searchBoxClassNames.input, styles.input, state.input.className);

  if (state.dismiss) {
    // eslint-disable-next-line react-hooks/immutability
    state.dismiss.className = clsx(
      searchBoxClassNames.dismiss,
      styles.dismiss,
      !state.contentAfter && styles.contentAfter,
      state.dismiss.className,
    );
  }

  if (state.contentBefore) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentBefore.className = clsx(searchBoxClassNames.contentBefore, state.contentBefore.className);
  }

  if (state.contentAfter) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentAfter.className = clsx(
      searchBoxClassNames.contentAfter,
      styles.contentAfter,
      state.contentAfter.className,
    );
  }

  useInputStyles(state);
  return state;
};
