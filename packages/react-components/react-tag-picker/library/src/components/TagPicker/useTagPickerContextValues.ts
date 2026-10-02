'use client';

import * as React from 'react';
import type { TagPickerContextValues, TagPickerState } from './TagPicker.types';

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
    noPopover,
    selectionMode = 'multiselect',
  } = state;
  const multiselect = selectionMode === 'multiselect';
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
      multiselect,
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
      noPopover,
      selectionMode,
    },
  };
}

const noop = () => {
  /** noop */
};
