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

    paddingLeft: `var(--ctrl-token-SearchBox-1579, var(--semantic-token-SearchBox-1580, ${tokens.spacingHorizontalSNudge}))`,
    paddingRight: `var(--ctrl-token-SearchBox-1581, var(--semantic-token-SearchBox-1582, ${tokens.spacingHorizontalSNudge}))`,
  },
  medium: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: `var(--ctrl-token-SearchBox-1583, var(--semantic-token-SearchBox-1584, ${tokens.spacingHorizontalS}))`,
    paddingRight: `var(--ctrl-token-SearchBox-1585, var(--semantic-token-SearchBox-1586, ${tokens.spacingHorizontalS}))`,
  },
  large: {
    columnGap: 0,
    maxWidth: '468px',

    paddingLeft: `var(--ctrl-token-SearchBox-1587, var(--semantic-token-SearchBox-1588, ${tokens.spacingHorizontalMNudge}))`,
    paddingRight: `var(--ctrl-token-SearchBox-1589, var(--semantic-token-SearchBox-1590, ${tokens.spacingHorizontalMNudge}))`,
  },

  input: {
    paddingLeft: `var(--ctrl-token-SearchBox-1591, var(--semantic-token-SearchBox-1592, ${tokens.spacingHorizontalSNudge}))`,
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
    paddingLeft: `var(--ctrl-token-SearchBox-1593, var(--semantic-token-SearchBox-1594, ${tokens.spacingHorizontalM}))`,
    columnGap: `var(--ctrl-token-SearchBox-1595, var(--semantic-token-SearchBox-1596, ${tokens.spacingHorizontalXS}))`,
  },
  rest: {
    opacity: 0,
    height: 0,
    width: 0,
  },
});

const useDismissClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: `var(--ctrl-token-SearchBox-1597, var(--semantic-token-SearchBox-1598, ${tokens.colorNeutralForeground3}))`, // "icon color" in design spec
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
  cursor: 'pointer',
});

const useDismissStyles = makeStyles({
  disabled: {
    color: `var(--ctrl-token-SearchBox-1599, var(--semantic-token-SearchBox-1600, ${tokens.colorNeutralForegroundDisabled}))`,
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
