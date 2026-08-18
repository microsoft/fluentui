'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

type UseComboboxFilterConfig = {
  /**
   * The current query string used to filter the options.
   */
  query: string;
  /**
   * The list of options to filter.
   */
  options: string[];
  /**
   * Optional filter function to override the default filtering behavior.
   */
  filter?: (option: string, index: number) => boolean;
  /**
   * Element to render when there are no options to display.
   */
  noOptionsElement: JSXElement;
  /**
   * A function that renders an option element for a given option.
   * Use it to customize how options are displayed in the listbox.
   */
  renderOption: (option: string) => JSXElement;
};

/**
 * A hook that filters a list of options based on a query string and returns the filtered options as JSX elements.
 *
 * @param config - The configuration object for the hook.
 * @returns An array of JSX elements representing the filtered options.
 */
export function useComboboxFilter({
  filter: filterOverride,
  noOptionsElement,
  renderOption,
  query,
  options,
}: UseComboboxFilterConfig): JSXElement[] {
  const defaultFilter = React.useCallback(
    (option: string) => {
      const trimmedQuery = query.trim();
      return trimmedQuery === '' || option.toLowerCase().includes(trimmedQuery.toLowerCase());
    },
    [query],
  );
  const filter = filterOverride ?? defaultFilter;
  const filteredOptions = React.useMemo(
    () =>
      options.reduce<JSXElement[]>((accumulator, option, index) => {
        if (filter(option, index)) {
          accumulator.push(renderOption(option));
        }
        return accumulator;
      }, []),
    [options, renderOption, filter],
  );

  return filteredOptions.length === 0
    ? [noOptionsElement.key ? noOptionsElement : React.cloneElement(noOptionsElement, { key: 'no-options' })]
    : filteredOptions;
}
