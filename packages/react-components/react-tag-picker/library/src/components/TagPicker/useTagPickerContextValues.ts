import * as React from 'react';
import { TagPickerContextValues, TagPickerState } from './TagPicker.types';

export function useTagPickerContextValues(state: TagPickerState): TagPickerContextValues {
  const {
    onOptionClick,
    registerOption,
    selectedOptions,
    selectOption,
    value,
    triggerRef,
    secondaryActionRef,
    tagPickerGroupRef,
    targetRef,
    size,
    setValue,
    setOpen,
    setHasFocus,
    popoverRef,
    appearance,
    clearSelection,
    getOptionById,
    getOptionsMatchingValue,
    open,
    popoverId,
    disabled,
  } = state;
  return {
    activeDescendant: React.useMemo(
      () => ({ controller: state.activeDescendantController }),
      [state.activeDescendantController],
    ),
    listbox: {
      onOptionClick,
      registerOption,
      getOptionById,
      getOptionsMatchingValue,
      selectedOptions,
      selectOption,
      focusVisible: false,
      setActiveOption: noop,
    },
    picker: {
      value,
      triggerRef,
      targetRef,
      secondaryActionRef,
      tagPickerGroupRef,
      size,
      setValue,
      setOpen,
      setHasFocus,
      selectOption,
      popoverRef,
      selectedOptions,
      appearance,
      clearSelection,
      getOptionById,
      open,
      popoverId,
      disabled,
    },
  };
}

const noop = () => {
  /** noop */
};
