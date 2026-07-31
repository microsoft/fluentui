'use client';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import { TagPickerOption } from './TagPickerOption';

type UseTagPickerFilterConfig = {
  query: string;
  options: string[];
  filter?: (option: string, index: number) => boolean;
  noOptionsElement: JSXElement;
  renderOption?: (option: string) => JSXElement;
};

function defaultRenderOption(option: string): JSXElement {
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
}: UseTagPickerFilterConfig): JSXElement[] {
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
