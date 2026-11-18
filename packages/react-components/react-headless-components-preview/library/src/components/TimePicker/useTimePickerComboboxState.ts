'use client';

import * as React from 'react';
import { elementContains, mergeCallbacks, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import { useFieldContext } from '../Field';
import type { ComboboxState } from '../Combobox/Combobox.types';
import type { TimePickerTimeState } from './TimePicker.types';
import type { TimePickerSelection } from './useTimePickerSelection';

/**
 * Applies TimePicker behaviors on top of a Combobox state:
 * - merges the clear icon ref used to distinguish clearing from freeform input;
 * - in freeform mode, selects the time parsed from the input when it changes and the user presses Enter or focus leaves the TimePicker;
 * - labels the expand icon by the Field label.
 *
 * @param comboboxState - state returned by `useCombobox`
 * @param selection - result of `useTimePickerSelection`
 */
export const useTimePickerComboboxState = (
  comboboxState: ComboboxState,
  selection: Pick<
    TimePickerSelection,
    'clearIconRef' | 'freeform' | 'parseTimeStringToDate' | 'commitValue' | 'committedText' | 'onInputChange'
  >,
): ComboboxState & TimePickerTimeState => {
  const { clearIconRef, freeform, parseTimeStringToDate, commitValue, committedText, onInputChange } = selection;
  const { activeDescendantController, getOptionById, open, selectedOptions, value } = comboboxState;
  const fieldContext = useFieldContext();
  const required = !!fieldContext?.required || !!comboboxState.input.required;

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

  React.useEffect(() => {
    const activeOption = freeform ? getActiveOption() : null;

    if (!activeOption) {
      return;
    }

    const text = value?.trim().toLowerCase();
    const textMatchesActiveOption = text
      ? activeOption.text.toLowerCase().indexOf(text) === 0
      : selectedOptions.length === 0;

    if (!textMatchesActiveOption) {
      activeDescendantController.blur();
    }
  }, [freeform, open, value, selectedOptions, activeDescendantController, getActiveOption]);

  const selectTimeFromValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!freeform) {
        return;
      }

      if ((committedText ?? '') !== (value ?? '')) {
        if (!value?.trim()) {
          commitValue(event, { value: null, displayValue: '', errorType: required ? 'required-input' : undefined });
        } else {
          const { date, errorType } = parseTimeStringToDate(value);
          commitValue(event, { value: date, displayValue: value, errorType });
        }
      }
    },
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const onRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    // Enter commits only from the input, and not while it confirms an IME composition.
    if (
      event.key === Enter &&
      event.target === inputRef.current &&
      !event.nativeEvent.isComposing &&
      !getActiveOption()
    ) {
      selectTimeFromValue(event);
    }
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.relatedTarget || !elementContains(rootRef.current, event.relatedTarget)) {
      selectTimeFromValue(event);
    }
  });

  // Keys that confirm an IME composition must not reach the Combobox, which would select the active option.
  const onInputKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.nativeEvent.isComposing) {
      comboboxState.input.onKeyDown?.(event);
    }
  });

  const rootMergedRef = useMergedRefs(comboboxState.root.ref, rootRef);
  const inputMergedRef = useMergedRefs(comboboxState.input.ref, inputRef);
  const clearIconMergedRef = useMergedRefs(comboboxState.clearIcon?.ref, clearIconRef);
  const expandIconFieldLabelProps = useExpandIconFieldLabelProps(comboboxState.expandIcon, fieldContext?.labelId);

  return {
    ...comboboxState,
    root: {
      ...comboboxState.root,
      ref: rootMergedRef,
      onKeyDown: mergeCallbacks(onRootKeyDown, comboboxState.root.onKeyDown),
    },
    input: {
      ...comboboxState.input,
      ref: inputMergedRef,
      onChange: mergeCallbacks(comboboxState.input.onChange, onInputChange),
      onKeyDown: onInputKeyDown,
      onBlur: mergeCallbacks(onBlur, comboboxState.input.onBlur),
    },
    listbox: comboboxState.listbox ? { ...comboboxState.listbox, tabIndex: -1 } : undefined,
    expandIcon: comboboxState.expandIcon
      ? {
          ...comboboxState.expandIcon,
          onBlur: mergeCallbacks(onBlur, comboboxState.expandIcon.onBlur),
          ...expandIconFieldLabelProps,
        }
      : undefined,
    clearIcon: comboboxState.clearIcon ? { ...comboboxState.clearIcon, ref: clearIconMergedRef } : undefined,
    freeform,
    parseTimeStringToDate,
    committedText,
  };
};

/**
 * Provides a default aria-labelledby for the expand icon if the TimePicker is wrapped in a Field
 * and the expand icon still has the default label from Combobox.
 */
const useExpandIconFieldLabelProps = (
  expandIcon: ComboboxState['expandIcon'],
  fieldLabelId: string | undefined,
): { id: string; 'aria-labelledby': string } | undefined => {
  const defaultChevronId = useId('timepicker-chevron-');
  const defaultLabelFromCombobox = 'Open';

  if (fieldLabelId && expandIcon?.['aria-label'] === defaultLabelFromCombobox) {
    const id = expandIcon.id ?? defaultChevronId;
    return { id, 'aria-labelledby': `${id} ${fieldLabelId}` };
  }

  return undefined;
};
