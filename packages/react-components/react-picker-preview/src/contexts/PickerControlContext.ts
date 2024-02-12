import * as React from 'react';
import { ComboboxProps } from '@fluentui/react-combobox';

export type PickerControlContextValue = Pick<Required<ComboboxProps>, 'size' | 'appearance' | 'disabled' | 'clearable'>;

const pickerControlContextDefaultValue: PickerControlContextValue = {
  size: 'medium',
  appearance: 'outline',
  disabled: false,
  clearable: false,
};

const PickerControlContext = React.createContext<PickerControlContextValue | undefined>(undefined);

export const PickerControlContextProvider = PickerControlContext.Provider;
export const usePickerControlContext = () => React.useContext(PickerControlContext) ?? pickerControlContextDefaultValue;
