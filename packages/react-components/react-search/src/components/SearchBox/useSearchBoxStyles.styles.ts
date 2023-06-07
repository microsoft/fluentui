import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
  root: 'fui-SearchBox',
  contentBefore: 'fui-SearchBox__contentBefore',
  dismiss: 'fui-SearchBox__dismiss',
  contentAfter: 'fui-SearchBox__contentAfter',
};

/**
 * Styles for the root slot
 */
const useRootClassName = makeResetStyles({});

const useContentClassName = makeResetStyles({
  boxSizing: 'border-box',
  display: 'flex',
  // special case styling for icons (most common case) to ensure they're centered vertically
  // size: medium (default)
  '> svg': { fontSize: '20px' },
});

/**
 * Apply styling to the SearchBox slots based on the state
 */
export const useSearchBoxStyles_unstable = (state: SearchBoxState): SearchBoxState => {
  state.root.className = mergeClasses(useRootClassName(), state.root.className);

  const contentClasses = [useContentClassName()];
  if (state.contentBefore) {
    state.contentBefore.className = mergeClasses(
      searchBoxClassNames.contentBefore,
      ...contentClasses,
      state.contentBefore.className,
    );
  }
  if (state.contentAfter) {
    state.contentAfter.className = mergeClasses(
      searchBoxClassNames.contentAfter,
      ...contentClasses,
      state.contentAfter.className,
    );
  }
  if (state.dismiss) {
    state.dismiss.className = mergeClasses(searchBoxClassNames.dismiss, ...contentClasses, state.dismiss.className);
  }

  return state;
};
