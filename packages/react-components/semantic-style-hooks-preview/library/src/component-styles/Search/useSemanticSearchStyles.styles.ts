'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { useSemanticInputStyles } from '../Input';
import { type SearchBoxState, searchBoxClassNames } from '@fluentui/react-search';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  small: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: `calc(${semanticTokens.groupInputPaddingHorizontal} / 2)`,
    paddingRight: `calc(${semanticTokens.groupInputPaddingHorizontal} /2)`,
  },
  medium: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: `calc(${semanticTokens.groupInputPaddingHorizontal} / 3 * 2)`,
    paddingRight: `calc(${semanticTokens.groupInputPaddingHorizontal} / 3 * 2)`,
  },
  large: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: `calc(${semanticTokens.groupInputPaddingHorizontal} / 6 * 5)`,
    paddingRight: `calc(${semanticTokens.groupInputPaddingHorizontal} / 6 * 5)`,
  },

  input: {
    paddingLeft: `calc(${semanticTokens.groupInputGap} * 1.5)`,
    paddingRight: 0,

    // removes the WebKit pseudoelement styling
    '::-webkit-search-decoration': {
      display: 'none',
    },
    '::-webkit-search-cancel-button': {
      display: 'none',
    },
  },

  unfocusedNoContentAfter: {
    paddingRight: 0,
  },
});

const useInputStyles = makeStyles({
  small: {
    paddingRight: `calc(${semanticTokens.groupInputPaddingHorizontal} / 2)`,
  },
  medium: {
    paddingRight: semanticTokens.groupInputPaddingHorizontal,
  },
  large: {
    paddingRight: `calc(${semanticTokens.groupInputPaddingHorizontal} / 6 * 5)`,
  },
});

const useContentAfterStyles = makeStyles({
  contentAfter: {
    paddingLeft: `calc(${semanticTokens.groupInputGap} * 3)`,
    columnGap: semanticTokens.groupInputGap,
  },
  rest: {
    height: 0,
    width: 0,
    paddingLeft: 0,
    overflow: 'hidden',
  },
});

const useDismissClassName = makeStyles({
  root: {
    boxSizing: 'border-box',
    color: semanticTokens.groupInputIconForeground, // "icon color" in design spec
    display: 'flex',
    // special case styling for icons (most common case) to ensure they're centered vertically
    // size: medium (default)
    '> svg': { fontSize: semanticTokens.groupInputIconSize },
    cursor: 'pointer',
  },
});

const useDismissStyles = makeStyles({
  disabled: {
    color: semanticTokens.groupInputForegroundDisabled,
  },
  // Ensure resizable icons show up with the proper font size
  small: {
    '> svg': { fontSize: '16px' },
  },
  medium: {
    // included in useDismissClassName
  },
  large: {
    '> svg': { fontSize: '24px' },
  },
});

/**
 * Apply styling to the SearchBox slots based on the state
 */
export const useSemanticSearchBoxStyles = (_state: unknown): SearchBoxState => {
  'use no memo';

  const state = _state as SearchBoxState;

  const { disabled, focused, size } = state;

  const rootStyles = useRootStyles();
  const inputStyles = useInputStyles();
  const contentAfterStyles = useContentAfterStyles();
  const dismissClassName = useDismissClassName();
  const dismissStyles = useDismissStyles();

  useSemanticInputStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    searchBoxClassNames.root,
    rootStyles[size],
    !focused && rootStyles.unfocusedNoContentAfter,
    getSlotClassNameProp_unstable(state.root),
  );

  state.input.className = mergeClasses(
    state.input.className,
    searchBoxClassNames.input,
    rootStyles.input,
    !focused && inputStyles[size],
    getSlotClassNameProp_unstable(state.input),
  );

  if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      state.dismiss.className,
      searchBoxClassNames.dismiss,
      dismissClassName.root,
      disabled && dismissStyles.disabled,
      dismissStyles[size],
      getSlotClassNameProp_unstable(state.dismiss),
    );
  }

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      state.contentBefore.className,
      searchBoxClassNames.contentBefore,
      getSlotClassNameProp_unstable(state.contentBefore),
    );
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      state.contentAfter.className,
      searchBoxClassNames.contentAfter,
      contentAfterStyles.contentAfter,
      !focused && contentAfterStyles.rest,
      getSlotClassNameProp_unstable(state.contentAfter),
    );
  } else if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      contentAfterStyles.contentAfter,
      state.dismiss.className,
      getSlotClassNameProp_unstable(state.dismiss),
    );
  }

  return state;
};
