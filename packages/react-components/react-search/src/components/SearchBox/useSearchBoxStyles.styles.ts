import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  dismiss: 'fui-SearchBox__dismiss',
  contentAfter: 'fui-SearchBox__contentAfter',
};

/**
 * Styles for the root slot
 */
const useRootClassName = makeResetStyles({
  // removes the WebKit pseudoelement styling
  '::-webkit-search-decoration': {
    display: 'none',
  },
  '::-webkit-search-cancel-button': {
    display: 'none',
  },
});

const useContentClassName = makeResetStyles({
  boxSizing: 'border-box',
  color: tokens.colorNeutralForeground3, // "icon color" in design spec
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
});

const useContentStyles = makeStyles({
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
  // Ensure resizable icons show up with the proper font size
  small: {
    '> svg': { fontSize: '16px' },
  },
  medium: {
    // included in useContentClassName
  },
  large: {
    '> svg': { fontSize: '24px' },
  },
});

/**
 * Apply styling to the SearchBox slots based on the state
 */
export const useSearchBoxStyles_unstable = (state: SearchBoxState): SearchBoxState => {
  const { size } = state.root;
  const disabled = state.root.input!.disabled;

  const contentClassName = useContentClassName();
  const contentStyles = useContentStyles();

  state.root.input!.className = mergeClasses(useRootClassName(), state.root.className);

  if (state.dismiss) {
    state.dismiss.className = mergeClasses(
      searchBoxClassNames.dismiss,
      contentClassName,
      disabled && contentStyles.disabled,
      contentStyles[size],
      state.dismiss.className,
    );
  }

  return state;
};
