import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { TagPickerSize } from '../components/TagPicker/TagPicker.types';
import { ComboboxBaseState } from '@fluentui/react-combobox';

export interface TagPickerContextValue
  extends Pick<
    ComboboxBaseState,
    | 'open'
    | 'clearSelection'
    | 'getOptionById'
    | 'selectedOptions'
    | 'selectOption'
    | 'setHasFocus'
    | 'setOpen'
    | 'setValue'
    | 'value'
    | 'appearance'
    | 'disabled'
  > {
  triggerRef: React.RefObject<HTMLInputElement | HTMLButtonElement | null>;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  popoverId: string;
  targetRef: React.RefObject<HTMLDivElement | null>;
  secondaryActionRef: React.RefObject<HTMLSpanElement | null>;
  tagPickerGroupRef: React.RefObject<HTMLDivElement | null>;
  size: TagPickerSize;
  noPopover?: boolean;
}

/**
 * @internal
 */
export const tagPickerContextDefaultValue: TagPickerContextValue = {
  triggerRef: React.createRef<HTMLInputElement>(),
  popoverRef: React.createRef<HTMLDivElement>(),
  targetRef: React.createRef<HTMLDivElement>(),
  tagPickerGroupRef: React.createRef<HTMLDivElement>(),
  secondaryActionRef: React.createRef<HTMLDivElement>(),
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
  disabled: false,
};

const TagPickerContext = createContext<TagPickerContextValue | undefined>(undefined);

export const TagPickerContextProvider = TagPickerContext.Provider;
export const useTagPickerContext_unstable = <T>(selector: ContextSelector<TagPickerContextValue, T>): T =>
  useContextSelector(TagPickerContext, (ctx = tagPickerContextDefaultValue) => selector(ctx));
