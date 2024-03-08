import * as React from 'react';
import { ComboboxProps } from '@fluentui/react-combobox';

export type TagPickerControlContextValue = Pick<
  Required<ComboboxProps>,
  'size' | 'appearance' | 'disabled' | 'clearable'
>;

const tagPickerControlContextDefaultValue: TagPickerControlContextValue = {
  size: 'medium',
  appearance: 'outline',
  disabled: false,
  clearable: false,
};

const TagPickerControlContext = React.createContext<TagPickerControlContextValue | undefined>(undefined);

export const TagPickerControlContextProvider = TagPickerControlContext.Provider;
export const useTagPickerControlContext = () =>
  React.useContext(TagPickerControlContext) ?? tagPickerControlContextDefaultValue;
