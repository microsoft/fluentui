'use client';

import * as React from 'react';
import { elementContains, mergeCallbacks, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import { useFieldContext_unstable as useFieldContext } from '@fluentui/react-field';
import type { TimePickerComboboxState, TimePickerTimeState } from './TimePicker.types';
import type { TimePickerSelection } from './useTimePickerSelection';

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
export const useTimePickerComboboxState_unstable = <TState extends TimePickerComboboxState>(
  comboboxState: TState,
  selection: Pick<
    TimePickerSelection<unknown>,
    'clearIconRef' | 'freeform' | 'parseTimeStringToDate' | 'commitValue' | 'committedText'
  >,
): TState & TimePickerTimeState => {
  const { clearIconRef, freeform, parseTimeStringToDate, commitValue, committedText } = selection;
  const { activeDescendantController, getOptionById, value } = comboboxState;
  const fieldContext = useFieldContext();
  const required = !!fieldContext?.required || !!comboboxState.input.required;

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

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

  const onRootKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === Enter && !getActiveOption()) {
      selectTimeFromValue(event);
    }
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.relatedTarget || !elementContains(rootRef.current, event.relatedTarget)) {
      selectTimeFromValue(event);
    }
  });

  const rootMergedRef = useMergedRefs(comboboxState.root.ref, rootRef);
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
  expandIcon: TimePickerComboboxState['expandIcon'],
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
