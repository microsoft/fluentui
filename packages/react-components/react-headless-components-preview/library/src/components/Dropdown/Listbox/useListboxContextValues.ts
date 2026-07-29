'use client';

import { useListboxContextValues as useListboxContextValues_unstable } from '@fluentui/react-combobox';

import type { ListboxContextValues, ListboxState } from './Listbox.types';

export const useListboxContextValues = useListboxContextValues_unstable as (
  state: ListboxState,
) => ListboxContextValues;
