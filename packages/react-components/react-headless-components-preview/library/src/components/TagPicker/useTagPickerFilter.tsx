'use client';

import * as React from 'react';
import { useTagPickerFilter as useStyledTagPickerFilter } from '@fluentui/react-tag-picker';
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
  filter,
  noOptionsElement,
  renderOption = defaultRenderOption,
  query,
  options,
}: UseTagPickerFilterConfig): JSXElement[] {
  return useStyledTagPickerFilter({ filter, noOptionsElement, renderOption, query, options });
}
