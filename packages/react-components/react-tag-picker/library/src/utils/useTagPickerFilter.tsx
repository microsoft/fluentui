import * as React from 'react';
import { TagPickerOption } from '../TagPickerOption';

type UseTagPickerFilterConfig = {
  query: string;
  options: string[];
  /**
   * Provides a custom filter for the option.
   * By default the filter will check if the option includes the query.
   */
  filter?: (option: string, index: number) => boolean;

  /** Provides an element to be displayed when there are no options. */
  noOptionsElement: JSX.Element;

  /** Provides a custom render for the option. */
  renderOption?: (option: string) => JSX.Element;
};

function defaultRenderOption(option: string) {
  return (
    <TagPickerOption value={option} key={option}>
      {option}
    </TagPickerOption>
  );
}

export function useTagPickerFilter({
  filter: filterOverride,
  noOptionsElement,
  renderOption = defaultRenderOption,
  query,
  options,
}: UseTagPickerFilterConfig) {
  const defaultFilter = React.useCallback(
    (option: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery === '') {
        return true;
      }
      return option.toLowerCase().includes(trimmedQuery.toLowerCase());
    },
    [query],
  );
  const filter = filterOverride ?? defaultFilter;
  const filteredOptions = React.useMemo(
    () =>
      options.reduce<JSX.Element[]>((accumulator, option, index) => {
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
