import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { ComboboxBaseState } from '../utils/ComboboxBase.types';

export interface TagPickerContextValue
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
  size: 'medium' | 'large' | 'extra-large';
}

/**
 * @internal
 */
export const tagPickerContextDefaultValue: TagPickerContextValue = {
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
  size: 'medium',
};

const TagPickerContext = createContext<TagPickerContextValue | undefined>(undefined);

export const TagPickerContextProvider = TagPickerContext.Provider;
export const useTagPickerContext_unstable = <T>(selector: ContextSelector<TagPickerContextValue, T>) =>
  useContextSelector(TagPickerContext, (ctx = tagPickerContextDefaultValue) => selector(ctx));
