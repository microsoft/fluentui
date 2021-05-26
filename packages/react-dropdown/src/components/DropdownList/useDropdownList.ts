import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { DropdownListProps, DropdownListState } from './DropdownList.types';
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
  const focusAttributes = useArrowNavigationGroup({ circular: true });
  const { findAllFocusable } = useFocusFinders();
  const dropdownContext = useDropdownContextSelectors();

  if (usingPropsAnddropdownContext(props, dropdownContext)) {
    // TODO throw warnings in development safely
    // eslint-disable-next-line no-console
    console.warn("You're using both DropdownList and Dropdown props, we recommend using Dropdown props if available");
  }

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'listbox',
      'aria-labelledby': dropdownContext.triggerId,
      ...focusAttributes,
      ...(dropdownContext.hasDropdownContext && { ...dropdownContext }),
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  state.setFocusByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => {
      // TODO use some kind of children registration to reduce dependency on DOM roles
      const acceptedRoles = ['option'];
      const dropdownOptions = findAllFocusable(
        state.ref.current,
        (el: HTMLElement) => el.hasAttribute('role') && acceptedRoles.indexOf(el.getAttribute('role')!) !== -1,
      );

      let startIndex = dropdownOptions.indexOf(itemEl) + 1;
      if (startIndex === dropdownOptions.length) {
        startIndex = 0;
      }

      const firstChars = dropdownOptions.map(dropdownOption => dropdownOption.textContent?.charAt(0).toLowerCase());
      const char = e.key.toLowerCase();

      const getIndexFirstChars = (start: number, firstChar: string) => {
        for (let i = start; i < firstChars.length; i++) {
          if (char === firstChars[i]) {
            return i;
          }
        }
        return -1;
      };

      // Check remaining slots in the dropdown
      let index = getIndexFirstChars(startIndex, char);

      // If not found in remaining slots, check from beginning
      if (index === -1) {
        index = getIndexFirstChars(0, char);
      }

      // If match was found...
      if (index > -1) {
        dropdownOptions[index].focus();
      }
    },
    [findAllFocusable, state.ref],
  );

  return state;
};

/**
 * Adds some sugar to fetching multiple context selector values
 */
const useDropdownContextSelectors = () => {
  const hasDropdownContext = useDropdownContext(context => context.hasDropdownContext);
  const triggerId = useDropdownContext(context => context.triggerId);

  return {
    hasDropdownContext,
    triggerId,
  };
};

/**
 * Helper function to detect if props and DropdownContext values are both used
 */
const usingPropsAnddropdownContext = (
  props: DropdownListProps,
  contextValue: ReturnType<typeof useDropdownContextSelectors>,
) => {
  let isUsingPropsAndContext = false;
  for (const val in contextValue) {
    if (props[val as keyof Omit<typeof contextValue, 'hasDropdownContext' | 'triggerId'>]) {
      isUsingPropsAndContext = true;
    }
  }

  return contextValue.hasDropdownContext && isUsingPropsAndContext;
};
