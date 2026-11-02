'use client';

import { useComboboxContextValues } from '@fluentui/react-combobox';
import type { DropdownState, DropdownContextValues } from './Dropdown.types';

export const useDropdownContextValues = useComboboxContextValues as unknown as (
  state: DropdownState,
) => DropdownContextValues;
