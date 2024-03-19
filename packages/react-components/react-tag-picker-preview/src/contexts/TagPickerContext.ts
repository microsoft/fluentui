import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { ComboboxBaseState } from '../utils/ComboboxBase.types';
import type { TagPickerSize } from '../components/TagPicker/TagPicker.types';

export interface TagPickerContextValue
  extends Pick<
    ComboboxBaseState,
    | 'multiselect'
    | 'open'
    | 'clearSelection'
    | 'getOptionById'
    | 'open'
    | 'selectedOptions'
    | 'selectOption'
    | 'setHasFocus'
    | 'setOpen'
    | 'setValue'
    | 'value'
    | 'appearance'
  > {
  triggerRef: React.RefObject<HTMLInputElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  popoverId: string;
  targetRef: React.RefObject<HTMLElement>;
  size: TagPickerSize;
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
  appearance: 'outline',
};

const TagPickerContext = createContext<TagPickerContextValue | undefined>(undefined);

export const TagPickerContextProvider = TagPickerContext.Provider;
export const useTagPickerContext_unstable = <T>(selector: ContextSelector<TagPickerContextValue, T>) =>
  useContextSelector(TagPickerContext, (ctx = tagPickerContextDefaultValue) => selector(ctx));
