import * as React from 'react';
import {
  DropdownActions,
  getDropdownActionFromKey,
  makeMergePropsCompat,
  resolveShorthandProps,
  useControllableValue,
  useDescendantsInit,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { DropdownListProps, DropdownListState, DropdownDescendant } from './DropdownList.types';
import { useDropdownContext } from '../../contexts/dropdownContext';

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<DropdownListState>();

/**
 * Returns the props and state required to render the component
 */
export const useDropdownList = (
  props: DropdownListProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: DropdownListProps,
): DropdownListState => {
  const dropdownContext = useDropdownContextSelectors();

  if (usingPropsAndDropdownContext(props, dropdownContext)) {
    // TODO throw warnings in development safely
    // eslint-disable-next-line no-console
    console.warn("You're using both DropdownList and Dropdown props, we recommend using Dropdown props if available");
  }

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'listbox',
      tabIndex: 0,
      'aria-labelledby': dropdownContext.triggerId,
      ...(dropdownContext.hasDropdownContext && { ...dropdownContext }),
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  const [descendants, setDescendants] = useDescendantsInit<DropdownDescendant>();
  state.descendants = descendants;
  state.setDescendants = setDescendants;

  // TODO: should this actually be controllable?
  const [activeIndex, setActiveIndex] = useControllableValue(state.activeIndex, 0);
  state.activeIndex = activeIndex;
  state.setActiveIndex = setActiveIndex;
  state['aria-activedescendant'] = descendants[activeIndex]?.id || '';

  const [searchString, setSearchString] = React.useState('');

  // reset the search string to empty after half a second of no typing
  React.useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setSearchString('');
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchString]);

  const findByCharacter = React.useCallback(
    (character: string): number => {
      const currentSearch = searchString + character;
      setSearchString(currentSearch);
      // TODO: should probably make an in-React way to get the text of options
      const descendantValues = descendants.map(descendant => descendant.element?.innerText || '');
      const orderedValues = [...descendantValues.slice(activeIndex + 1), ...descendantValues.slice(0, activeIndex + 1)];

      // find first full match, if it exists
      const firstMatch = findMatches(orderedValues, currentSearch)[0];
      if (firstMatch) {
        return descendantValues.indexOf(firstMatch);
      }

      // if no full match, but the search string is all the same letter, cycle though first letter matches
      // TODO: put this somewhere else, outside the callback
      // It's a small utility to check if every letter in the string is the same, e.g. "aaa"
      const allSameLetter = (array: string[]) => array.every(letter => letter === array[0]);
      if (allSameLetter(currentSearch.split(''))) {
        const matches = findMatches(orderedValues, currentSearch[0]);
        return descendantValues.indexOf(matches[0]);
      }

      // if none of the above, return -1
      return -1;
    },
    [descendants, activeIndex, searchString],
  );

  /**
   * Handle keyboard events on the listbox node
   */
  state.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(e, { open: true });
    const max = descendants.length;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Next:
        newIndex = Math.min(max - 1, activeIndex + 1);
        break;
      case DropdownActions.Previous:
        newIndex = Math.max(0, activeIndex - 1);
        break;
      case DropdownActions.First:
        newIndex = 0;
        break;
      case DropdownActions.Last:
        newIndex = max - 1;
        break;
      case DropdownActions.Type:
        // always prevent default and stop propagation when typing
        e.preventDefault();
        e.stopPropagation();

        const matchingIndex = findByCharacter(e.key);
        newIndex = matchingIndex > -1 ? matchingIndex : activeIndex;
        break;
      // TODO: pageup and pagedown, should increment be customizable?
    }

    if (newIndex !== activeIndex) {
      // prevent default scroll/keyboard action if the index changed
      e.preventDefault();
      setActiveIndex(newIndex);
    }
  });

  return state;
};

/**
 * Adds some sugar to fetching multiple context selector values
 */
const useDropdownContextSelectors = () => {
  const hasDropdownContext = useDropdownContext(context => context.hasDropdownContext);
  const triggerId = useDropdownContext(context => context.triggerId);
  const idBase = useDropdownContext(context => context.idBase);

  return {
    hasDropdownContext,
    idBase,
    triggerId,
  };
};

/**
 * Small helper function to find matches in an array for a search string
 * Matches against the start of the string
 *
 * TODO: evaulate if this should be moved to utilities
 */
const findMatches = (initialOptions: string[], searchString: string): string[] => {
  const searchLower = searchString.toLowerCase().trim();
  return initialOptions.filter(option => {
    return option.toLowerCase().indexOf(searchLower) === 0;
  });
};

/**
 * Helper function to detect if props and DropdownContext values are both used
 */
const usingPropsAndDropdownContext = (
  props: DropdownListProps,
  contextValue: ReturnType<typeof useDropdownContextSelectors>,
) => {
  let isUsingPropsAndContext = false;
  for (const val in contextValue) {
    if (props[val as keyof Omit<typeof contextValue, 'hasDropdownContext' | 'idBase' | 'triggerId'>]) {
      isUsingPropsAndContext = true;
    }
  }

  return contextValue.hasDropdownContext && isUsingPropsAndContext;
};
