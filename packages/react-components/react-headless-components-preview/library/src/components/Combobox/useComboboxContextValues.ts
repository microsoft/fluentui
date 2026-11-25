'use client';

import { useComboboxContextValues as useComboboxContextValuesBase } from '@fluentui/react-combobox';
import type { ComboboxState, ComboboxContextValues } from './Combobox.types';

export const useComboboxContextValues = useComboboxContextValuesBase as unknown as (
  state: ComboboxState,
) => ComboboxContextValues;
