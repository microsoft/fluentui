import * as React from 'react';
import { TagPickerContextValues, TagPickerState } from './TagPicker.types';

export function useTagPickerContextValues(state: TagPickerState): TagPickerContextValues {
  const {
    onOptionClick,
    registerOption,
    selectedOptions,
    selectOption,
    multiselect,
    // eslint-disable-next-line deprecation/deprecation
    focusVisible,
    // eslint-disable-next-line deprecation/deprecation
    setActiveOption,
    // eslint-disable-next-line deprecation/deprecation
    activeOption,
    value,
    triggerRef,
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
      focusVisible,
      setActiveOption,
      activeOption,
    },
    picker: {
      value,
      multiselect,
      triggerRef,
      targetRef,
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
    },
  };
}
