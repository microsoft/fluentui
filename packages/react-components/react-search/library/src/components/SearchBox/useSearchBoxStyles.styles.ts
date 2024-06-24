import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useInputStyles_unstable } from '@fluentui/react-input';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  dismiss: 'fui-SearchBox__dismiss',
  contentAfter: 'fui-SearchBox__contentAfter',
  contentBefore: 'fui-SearchBox__contentBefore',
  input: 'fui-SearchBox__input',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  small: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  medium: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
  },
  large: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: tokens.spacingHorizontalMNudge,
    paddingRight: tokens.spacingHorizontalMNudge,
  },

  input: {
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: 0,

    // removes the WebKit pseudoelement styling
    '::-webkit-search-decoration': {
      display: 'none',
    },
    '::-webkit-search-cancel-button': {
      display: 'none',
    },
  },
});

const useContentAfterStyles = makeStyles({
  contentAfter: {
    paddingLeft: tokens.spacingHorizontalM,
    columnGap: tokens.spacingHorizontalXS,
  },
  rest: {
    opacity: 0,
    height: 0,
    width: 0,
  },
});

const useDismissClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: tokens.colorNeutralForeground3, // "icon color" in design spec
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
  cursor: 'pointer',
});

const useDismissStyles = makeStyles({
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
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
export const useSearchBoxStyles_unstable = (state: SearchBoxState): SearchBoxState => {
  'use no memo';

  const { disabled, focused, size } = state;

  const rootStyles = useRootStyles();
  const contentAfterStyles = useContentAfterStyles();
  const dismissClassName = useDismissClassName();
  const dismissStyles = useDismissStyles();

  state.root.className = mergeClasses(searchBoxClassNames.root, rootStyles[size], state.root.className);
  state.input.className = mergeClasses(searchBoxClassNames.input, rootStyles.input, state.input.className);

  if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      searchBoxClassNames.dismiss,
      dismissClassName,
      disabled && dismissStyles.disabled,
      dismissStyles[size],

      state.dismiss.className,
    );
  }

  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(searchBoxClassNames.contentBefore, state.contentBefore.className);
  }

  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      searchBoxClassNames.contentAfter,
      contentAfterStyles.contentAfter,

      !focused && contentAfterStyles.rest,

      state.contentAfter.className,
    );
  } else if (state.dismiss) {
    state.dismiss.className = mergeClasses(state.dismiss.className, contentAfterStyles.contentAfter);
  }

  useInputStyles_unstable(state);

  return state;
};
