import * as React from 'react';
import { TagPickerContextValues, TagPickerState } from './TagPicker.types';

export function useTagPickerContextValues(state: TagPickerState): TagPickerContextValues {
  const {
    onOptionClick,
    registerOption,
    selectedOptions,
    selectOption,
    multiselect,
    value,
    triggerRef,
    secondaryActionRef,
    targetRef,
    size,
    setValue,
    setOpen,
    setHasFocus,
    popoverRef,
    appearance,
    clearSelection,
    getOptionById,
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
      selectedOptions,
      selectOption,
      multiselect,
      focusVisible: false,
      setActiveOption: noop,
    },
    picker: {
      value,
      multiselect,
      triggerRef,
      targetRef,
      secondaryActionRef,
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
