'use client';

import * as React from 'react';
import { elementContains, mergeCallbacks, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import type { BaseComboboxState } from '@fluentui/react-combobox';
import { useFieldContext_unstable as useFieldContext } from '@fluentui/react-field';
import type { TimePickerTimeState } from './TimePicker.types';
import type { TimePickerSelection } from './useTimePickerSelection';

/**
 * Subset of the Combobox state required by TimePicker.
 */
type ComboboxStateForTimePicker = Pick<
  BaseComboboxState,
  'root' | 'input' | 'listbox' | 'expandIcon' | 'clearIcon' | 'value' | 'getOptionById' | 'activeDescendantController'
>;

/**
 * Applies TimePicker behaviors on top of a Combobox state:
 * - merges the clear icon ref used to distinguish clearing from freeform input;
 * - in freeform mode, selects the time parsed from the input when it changes and the user presses Enter or focus leaves the TimePicker;
 * - labels the expand icon by the Field label.
 *
 * It does not depend on a specific Combobox implementation and is shared by the styled and headless TimePicker.
 *
 * @param comboboxState - state returned by a Combobox hook
 * @param selection - result of `useTimePickerSelection_unstable`
 */
export const useTimePickerComboboxState_unstable = <TState extends ComboboxStateForTimePicker>(
  comboboxState: TState,
  selection: Pick<
    TimePickerSelection<unknown>,
    'clearIconRef' | 'freeform' | 'parseTimeStringToDate' | 'selectTime' | 'submittedText'
  >,
): TState & TimePickerTimeState => {
  const { clearIconRef, freeform, parseTimeStringToDate, selectTime, submittedText } = selection;
  const { activeDescendantController, getOptionById, value } = comboboxState;

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

  // Base Combobox has activeOption default to first option in dropdown even if it doesn't match input value, and Enter key will select it.
  // This effect ensures that the activeOption is cleared when the input doesn't match any option.
  // This behavior is specific to a freeform TimePicker where the input value is treated as a valid time even if it's not in the dropdown.
  React.useEffect(() => {
    if (freeform && value) {
      const activeOption = getActiveOption();
      if (!activeOption) {
        return;
      }

      const valueMatchesActiveOption = activeOption.text.toLowerCase().indexOf(value.toLowerCase()) === 0;
      if (!valueMatchesActiveOption) {
        activeDescendantController.blur();
      }
    }
  }, [freeform, value, activeDescendantController, getActiveOption]);

  // Mimics the behavior of the browser's change event for a freeform TimePicker.
  const selectTimeFromValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!freeform) {
        return;
      }

      // Only triggers callback when the text in input has changed.
      if (submittedText !== value) {
        const { date: selectedTime, errorType } = parseTimeStringToDate(value);
        selectTime(event, { selectedTime, selectedTimeText: value, errorType });
      }
    },
  );

  const onRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === Enter && !getActiveOption()) {
      selectTimeFromValue(event);
    }
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const onInputBlur = useEventCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const isOutside = event.relatedTarget ? !elementContains(rootRef.current, event.relatedTarget) : true;
    if (isOutside) {
      selectTimeFromValue(event);
    }
  });

  const rootMergedRef = useMergedRefs(comboboxState.root.ref, rootRef);
  const clearIconMergedRef = useMergedRefs(comboboxState.clearIcon?.ref, clearIconRef);
  const expandIconFieldLabelProps = useExpandIconFieldLabelProps(comboboxState.expandIcon);

  return {
    ...comboboxState,
    root: {
      ...comboboxState.root,
      ref: rootMergedRef,
      onKeyDown: mergeCallbacks(onRootKeyDown, comboboxState.root.onKeyDown),
    },
    input: {
      ...comboboxState.input,
      onBlur: mergeCallbacks(onInputBlur, comboboxState.input.onBlur),
    },
    // tabIndex -1 allows the listbox and the expand icon to be the relatedTarget of a blur event.
    listbox: comboboxState.listbox ? { ...comboboxState.listbox, tabIndex: -1 } : undefined,
    expandIcon: comboboxState.expandIcon
      ? {
          ...comboboxState.expandIcon,
          tabIndex: -1,
          ...expandIconFieldLabelProps,
        }
      : undefined,
    clearIcon: comboboxState.clearIcon ? { ...comboboxState.clearIcon, ref: clearIconMergedRef } : undefined,
    freeform,
    parseTimeStringToDate,
    submittedText,
  };
};

/**
 * Provides a default aria-labelledby for the expand icon if the TimePicker is wrapped in a Field
 * and the expand icon still has the default label from Combobox.
 */
const useExpandIconFieldLabelProps = (
  expandIcon: ComboboxStateForTimePicker['expandIcon'],
): { id: string; 'aria-labelledby': string } | undefined => {
  const fieldContext = useFieldContext();
  const defaultChevronId = useId('timepicker-chevron-');
  const defaultLabelFromCombobox = 'Open';

  if (fieldContext?.labelId && expandIcon?.['aria-label'] === defaultLabelFromCombobox) {
    const id = expandIcon.id ?? defaultChevronId;
    return { id, 'aria-labelledby': `${id} ${fieldContext.labelId}` };
  }

  return undefined;
};
