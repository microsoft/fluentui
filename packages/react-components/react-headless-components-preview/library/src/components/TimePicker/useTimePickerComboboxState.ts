'use client';

import * as React from 'react';
import {
  elementContains,
  mergeCallbacks,
  slot,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { ArrowDown, ArrowUp, End, Enter, Escape, Home, Space, Tab } from '@fluentui/keyboard-keys';
import { useFieldContext } from '../Field';
import { Listbox } from '../Dropdown/Listbox';
import type { ComboboxState } from '../Combobox/Combobox.types';
import type { TimePickerProps, TimePickerState } from './TimePicker.types';
import type { TimePickerSelection } from './useTimePickerSelection';

/**
 * Applies TimePicker behaviors on top of a Combobox state:
 * - owns the keyboard and Clear button behavior specific to editable time input;
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
    | 'freeform'
    | 'parseTimeStringToDate'
    | 'commitValue'
    | 'committedText'
    | 'onInputChange'
    | 'cancelPendingText'
    | 'errorType'
    | 'shouldAutoFocus'
  >,
  props: TimePickerProps,
): TimePickerState => {
  const {
    freeform,
    parseTimeStringToDate,
    commitValue,
    committedText,
    onInputChange,
    cancelPendingText,
    errorType,
    shouldAutoFocus,
  } = selection;
  const { activeDescendantController, getOptionById, open, selectedOptions, value } = comboboxState;
  const fieldContext = useFieldContext();
  const required = !!fieldContext?.required || !!comboboxState.input.required;
  const suppressActivation = React.useRef(false);
  const openingDirection = React.useRef<'first' | 'last'>('first');
  const validatedText = React.useRef<string | undefined>(undefined);

  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

  React.useEffect(() => {
    if (!open) {
      return;
    }
    if (suppressActivation.current || !shouldAutoFocus) {
      activeDescendantController.blur();
      return;
    }
    if (!getActiveOption()) {
      activeDescendantController[openingDirection.current]();
    }
    openingDirection.current = 'first';
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
  }, [freeform, open, value, selectedOptions, activeDescendantController, getActiveOption, shouldAutoFocus]);

  const selectTimeFromValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!freeform || comboboxState.disabled) {
        return;
      }

      if ((committedText ?? '') !== (value ?? '') && validatedText.current !== value) {
        validatedText.current = value;
        if (!value?.trim()) {
          commitValue(event, { value: null, displayValue: '', errorType: required ? 'required-input' : undefined });
        } else {
          const parsed = parseTimeStringToDate(value);
          commitValue(event, { value: parsed.date, displayValue: value, errorType: parsed.errorType });
        }
      }
    },
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.relatedTarget || !elementContains(rootRef.current, event.relatedTarget)) {
      selectTimeFromValue(event);
    }
  });

  const consumerKeyDown = slot.resolveShorthand(props.input)?.onKeyDown ?? props.onKeyDown;
  const onInputKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || comboboxState.disabled) {
      consumerKeyDown?.(event);
      return;
    }
    const { key, altKey } = event;
    const ownedKey =
      key === Escape ||
      key === Home ||
      key === End ||
      key === Tab ||
      key === Space ||
      key === ArrowDown ||
      key === ArrowUp ||
      (freeform && key === Enter && (!open || !getActiveOption()));
    if (!ownedKey) {
      comboboxState.input.onKeyDown?.(event);
      return;
    }
    consumerKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    if (key === Escape) {
      validatedText.current = undefined;
      cancelPendingText();
      activeDescendantController.blur();
      if (open) {
        event.preventDefault();
        event.stopPropagation();
        comboboxState.setOpen(event, false);
      }
    } else if (key === ArrowDown || key === ArrowUp) {
      event.preventDefault();
      if (altKey) {
        suppressActivation.current = key === ArrowDown;
        comboboxState.setOpen(event, key === ArrowDown);
        activeDescendantController.blur();
      } else {
        suppressActivation.current = false;
        openingDirection.current = key === ArrowUp ? 'last' : 'first';
        comboboxState.setOpen(event, true);
        if (!open || !getActiveOption()) {
          const selected = comboboxState.getOptionsMatchingValue(optionValue =>
            selectedOptions.includes(optionValue),
          )[0];
          if (!open && selected) {
            activeDescendantController.focus(selected.id);
          } else if (key === ArrowUp) {
            activeDescendantController.last();
          } else {
            activeDescendantController.first();
          }
        } else if (key === ArrowUp) {
          activeDescendantController.prev();
        } else {
          activeDescendantController.next();
        }
      }
    } else if (key === Enter) {
      event.preventDefault();
      selectTimeFromValue(event);
      comboboxState.setOpen(event, false);
    } else if (key === Home || key === End || key === Space) {
      activeDescendantController.blur();
      if (key === Space) {
        comboboxState.setOpen(event, true);
      }
    }
  });

  const rootMergedRef = useMergedRefs(comboboxState.root.ref, rootRef);
  const inputMergedRef = useMergedRefs(comboboxState.input.ref, inputRef);
  const expandIconFieldLabelProps = useExpandIconFieldLabelProps(comboboxState.expandIcon, fieldContext?.labelId);
  const onChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    suppressActivation.current = false;
    validatedText.current = undefined;
    onInputChange(event);
  });
  const onClear = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.isDefaultPrevented() && !comboboxState.disabled) {
      validatedText.current = undefined;
      commitValue(event, { value: null, displayValue: '', errorType: undefined });
      inputRef.current?.focus();
    }
  });
  const showClearIcon = !!props.clearable && !comboboxState.disabled && !!value;
  const clearIcon = slot.optional(props.clearIcon, {
    renderByDefault: showClearIcon,
    defaultProps: { type: 'button', 'aria-label': 'Clear' },
    elementType: 'button',
  });
  if (clearIcon) {
    clearIcon.onMouseDown = mergeCallbacks(clearIcon.onMouseDown, event => event.preventDefault());
    clearIcon.onClick = mergeCallbacks(clearIcon.onClick, onClear);
  }

  return {
    ...comboboxState,
    components: { root: 'div', input: 'input', clearIcon: 'button', expandIcon: 'span', listbox: Listbox },
    showClearIcon,
    root: {
      ...comboboxState.root,
      ref: rootMergedRef,
      onBlur: mergeCallbacks(onBlur, comboboxState.root.onBlur),
      'data-invalid': errorType || comboboxState.input['aria-invalid'] ? '' : undefined,
      'data-clearable': showClearIcon ? '' : undefined,
    },
    input: {
      ...comboboxState.input,
      'aria-autocomplete': 'list',
      'aria-haspopup': 'listbox',
      'aria-invalid': errorType ? true : comboboxState.input['aria-invalid'],
      ref: inputMergedRef,
      onChange: mergeCallbacks(comboboxState.input.onChange, onChange),
      onKeyDown: onInputKeyDown,
      onBlur: event => {
        if (!elementContains(rootRef.current, event.relatedTarget)) {
          comboboxState.input.onBlur?.(event);
        } else {
          (slot.resolveShorthand(props.input)?.onBlur ?? props.onBlur)?.(event);
        }
      },
    },
    listbox: comboboxState.listbox ? { ...comboboxState.listbox, tabIndex: -1 } : undefined,
    expandIcon:
      comboboxState.expandIcon && !showClearIcon
        ? {
            ...comboboxState.expandIcon,
            tabIndex: -1,
            onBlur: mergeCallbacks(onBlur, comboboxState.expandIcon.onBlur),
            ...expandIconFieldLabelProps,
          }
        : undefined,
    clearIcon: showClearIcon ? clearIcon : undefined,
    freeform,
    parseTimeStringToDate,
    committedText,
    errorType,
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
