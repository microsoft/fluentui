'use client';

import * as React from 'react';
import { elementContains, mergeCallbacks, useEventCallback, useId, useMergedRefs } from '@fluentui/react-utilities';
import { ArrowDown, ArrowUp, End, Enter, Escape, Home, Space } from '@fluentui/keyboard-keys';
import { useFieldContext } from '../Field';
import type { ComboboxState } from '../Combobox/Combobox.types';
import { toDataAttributeValue } from '../../utils';
import type { TimePickerState } from './TimePicker.types';
import type { TimePickerSelection } from './useTimePickerSelection';

/**
 * Which option to activate when the listbox opens from the keyboard, instead of the Combobox default
 * (the selected option, otherwise the first one).
 */
type OpenActivation = 'none' | 'last';

/**
 * Applies TimePicker behaviors on top of a Combobox state:
 * - in freeform mode, selects the time parsed from the input when it changes and the user presses Enter or focus leaves the TimePicker;
 * - keyboard: Home and End move the caret, Escape restores the committed text, Arrow Up opens on the last option,
 *   Alt+Arrow Down opens without activating an option, Alt+Arrow Up closes without selecting;
 * - the expand icon is a pointer-only affordance, the clear icon is a keyboard-operable button, and only one of them
 *   is shown;
 * - combobox ARIA defaults on the input;
 * - labels the expand icon by the Field label.
 *
 * @param comboboxState - state returned by `useCombobox`
 * @param selection - result of `useTimePickerSelection`
 * @param onUserKeyDown - the consumer's `onKeyDown` for the input, called for keys the TimePicker handles itself
 */
export const useTimePickerComboboxState = (
  comboboxState: ComboboxState,
  selection: Pick<
    TimePickerSelection,
    | 'clearIconRef'
    | 'freeform'
    | 'parseTimeStringToDate'
    | 'commitValue'
    | 'committedText'
    | 'onInputChange'
    | 'restoreCommittedText'
    | 'matchesText'
    | 'setSuppressAutoActivate'
    | 'errorType'
    | 'optionCount'
  >,
  onUserKeyDown?: React.KeyboardEventHandler<HTMLInputElement>,
): TimePickerState => {
  const {
    clearIconRef,
    freeform,
    parseTimeStringToDate,
    commitValue,
    committedText,
    onInputChange,
    restoreCommittedText,
    matchesText,
    setSuppressAutoActivate,
    errorType,
    optionCount,
  } = selection;
  const { activeDescendantController, getOptionById, open, selectedOptions, setOpen, showClearIcon, value } =
    comboboxState;
  const fieldContext = useFieldContext();
  const required = !!fieldContext?.required || !!comboboxState.input.required;

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

  // Runs after the Combobox has activated an option for the new open state, and overrides it.
  const openActivationRef = React.useRef<OpenActivation | undefined>(undefined);
  React.useEffect(() => {
    const openActivation = openActivationRef.current;
    openActivationRef.current = undefined;
    if (!open || !openActivation) {
      return;
    }

    if (openActivation === 'none') {
      activeDescendantController.blur();
    } else if (getActiveOption()?.value !== selectedOptions[0]) {
      activeDescendantController.last();
    }
  }, [open, activeDescendantController, getActiveOption, selectedOptions]);

  React.useEffect(() => {
    const activeOption = freeform ? getActiveOption() : null;

    if (!activeOption) {
      return;
    }

    const text = value?.trim();
    const textMatchesActiveOption = text ? matchesText(activeOption.text, text) : selectedOptions.length === 0;

    if (!textMatchesActiveOption) {
      activeDescendantController.blur();
    }
  }, [freeform, open, value, selectedOptions, activeDescendantController, getActiveOption, matchesText]);

  const selectTimeFromValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!freeform) {
        return;
      }

      if ((committedText ?? '') !== (value ?? '')) {
        if (!value?.trim()) {
          commitValue(event, { value: null, displayValue: '', errorType: required ? 'required-input' : undefined });
        } else {
          const { date, errorType: parseErrorType } = parseTimeStringToDate(value);
          commitValue(event, { value: date, displayValue: value, errorType: parseErrorType });
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

  /**
   * Handles the keys the TimePicker owns. Returns false for keys left to the Combobox.
   */
  const handleTimePickerKey = (event: React.KeyboardEvent<HTMLInputElement>): boolean => {
    const { key, altKey } = event;

    // Keys that confirm an IME composition must not reach the Combobox, which would select the active option.
    // Home and End keep their text-editing behavior and move the caret.
    if (event.nativeEvent.isComposing || key === Home || key === End) {
      return true;
    }

    // Escape cancels the pending edit. While open, the Combobox also closes the listbox and stops propagation.
    // While closed, Escape stops here only when it restored something, so it still closes a surrounding Dialog.
    if (key === Escape && restoreCommittedText(event) && !open) {
      event.stopPropagation();
      return true;
    }

    if (altKey && key === ArrowDown && !open) {
      event.preventDefault();
      openActivationRef.current = 'none';
      setSuppressAutoActivate(true);
      setOpen(event, true);
      return true;
    }

    if (altKey && key === ArrowUp) {
      event.preventDefault();
      if (open) {
        setOpen(event, false);
      }
      return true;
    }

    return false;
  };

  const onInputKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (handleTimePickerKey(event)) {
      onUserKeyDown?.(event);
      return;
    }

    if (event.key === ArrowUp && !open) {
      openActivationRef.current = 'last';
    }

    comboboxState.input.onKeyDown?.(event);
  });

  const onClearIconKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === Enter || event.key === Space) {
      event.preventDefault();
      comboboxState.clearSelection(event);
      inputRef.current?.focus();
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
      'data-invalid': toDataAttributeValue(!!errorType || comboboxState.root['data-invalid'] !== undefined),
    },
    input: {
      ...comboboxState.input,
      ref: inputMergedRef,
      'aria-autocomplete': comboboxState.input['aria-autocomplete'] ?? 'list',
      'aria-haspopup': comboboxState.input['aria-haspopup'] ?? 'listbox',
      // Reference the listbox for as long as it is mounted, including its exit animation.
      'aria-controls':
        comboboxState.input['aria-controls'] ??
        (comboboxState.shouldRenderListbox ? comboboxState.listbox?.id : undefined),
      onChange: mergeCallbacks(comboboxState.input.onChange, onInputChange),
      onKeyDown: onInputKeyDown,
      onBlur: mergeCallbacks(onBlur, comboboxState.input.onBlur),
    },
    listbox: comboboxState.listbox
      ? { ...comboboxState.listbox, tabIndex: -1, 'data-empty': toDataAttributeValue(optionCount === 0) }
      : undefined,
    expandIcon: comboboxState.expandIcon
      ? {
          ...comboboxState.expandIcon,
          // A pointer-only affordance: the input is the tab stop, and the keyboard opens the listbox from it.
          tabIndex: -1,
          // The clear icon replaces the expand icon while it is shown.
          hidden: showClearIcon || comboboxState.expandIcon.hidden,
          onBlur: mergeCallbacks(onBlur, comboboxState.expandIcon.onBlur),
          ...expandIconFieldLabelProps,
        }
      : undefined,
    clearIcon: comboboxState.clearIcon
      ? {
          ...comboboxState.clearIcon,
          ref: clearIconMergedRef,
          hidden: !showClearIcon || comboboxState.clearIcon.hidden,
          onKeyDown: mergeCallbacks(comboboxState.clearIcon.onKeyDown, onClearIconKeyDown),
          onBlur: mergeCallbacks(onBlur, comboboxState.clearIcon.onBlur),
        }
      : undefined,
    freeform,
    parseTimeStringToDate,
    committedText,
    errorType,
    optionCount,
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
