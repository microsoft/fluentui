import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ComboboxBaseState } from '@fluentui/react-combobox';

export interface PickerContextValue
  extends Pick<
    ComboboxBaseState,
    | 'multiselect'
    | 'open'
    | 'hasFocus'
    | 'clearSelection'
    | 'getOptionById'
    | 'open'
    | 'selectedOptions'
    | 'selectOption'
    | 'setHasFocus'
    | 'setOpen'
    | 'setValue'
    | 'value'
  > {
  triggerRef: React.RefObject<HTMLElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  popoverId: string;
  targetRef: React.RefObject<HTMLElement>;
}

const pickerContextDefaultValue: PickerContextValue = {
  multiselect: false,
  triggerRef: React.createRef<HTMLInputElement>(),
  popoverRef: React.createRef<HTMLDivElement>(),
  targetRef: React.createRef<HTMLElement>(),
  open: false,
  hasFocus: false,
  clearSelection: () => null,
  getOptionById: () => undefined,
  selectedOptions: [],
  selectOption: () => null,
  setHasFocus: () => null,
  setOpen: () => null,
  setValue: () => null,
  value: undefined,
  popoverId: '',
};

const PickerContext = createContext<PickerContextValue | undefined>(undefined);

export const PickerContextProvider = PickerContext.Provider;
export const usePickerContext_unstable = <T>(selector: ContextSelector<PickerContextValue, T>) =>
  useContextSelector(PickerContext, (ctx = pickerContextDefaultValue) => selector(ctx));
