import * as React from 'react';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';
import { useTriggerSlot, UseTriggerSlotState } from './useTriggerSlot';
import { ComboboxProps, ComboboxState } from '@fluentui/react-combobox';
import { OptionValue } from './OptionCollection.types';
import { getDropdownActionFromKey } from './dropdownKeyActions';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';

type UsedComboboxState = UseTriggerSlotState &
  Pick<ComboboxState, 'value' | 'setValue' | 'selectedOptions' | 'clearSelection' | 'getOptionById'>;

type UseInputTriggerSlotOptions = {
  state: UsedComboboxState;
  freeform: boolean | undefined;
  defaultProps?: Partial<ComboboxProps>;
  activeDescendantController: ActiveDescendantImperativeRef;
};

/**
 * @internal
 * useInputTriggerSlot returns a tuple of trigger/listbox shorthand,
 * with the semantics and event handlers needed for the Combobox and Dropdown components.
 * The element type of the ref should always match the element type used in the trigger shorthand.
 */
export function useInputTriggerSlot(
  triggerFromProps: NonNullable<Slot<'input'>>,
  ref: React.Ref<HTMLInputElement>,
  options: UseInputTriggerSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<'input'>>> {
  const {
    state: {
      open,
      value,
      selectOption,
      setValue,
      multiselect,
      selectedOptions,
      clearSelection,
      getOptionById,
      setOpen,
    },
    freeform,
    defaultProps,
    activeDescendantController,
  } = options;

  const getOptionFromInput = (inputValue: string): OptionValue | undefined => {
    const searchString = inputValue?.trim().toLowerCase();

    if (!searchString || searchString.length === 0) {
      activeDescendantController.blur();
      return;
    }

    const matcher = (optionText: string) => optionText.toLowerCase().indexOf(searchString) === 0;
    const match = activeDescendantController.find(id => {
      const option = getOptionById(id);
      return !!option && matcher(option.text);
    });

    if (!match) {
      activeDescendantController.blur();
      return undefined;
    }

    return getOptionById(match);
  };

  // save the typing vs. navigating options state, as the space key should behave differently in each case
  // we do not want to update the combobox when this changes, just save the value between renders
  const isTyping = React.useRef(false);

  const trigger = useTriggerSlot(
    {
      ...triggerFromProps,
      'aria-activedescendant': undefined,
      // update value and active option based on input
      onChange: useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        triggerFromProps.onChange?.(event);
        const inputValue = event.target.value;
        // update uncontrolled value
        setValue(inputValue);

        // handle updating active option based on input
        const matchingOption = getOptionFromInput(inputValue);

        // clear selection for single-select if the input value no longer matches the selection
        if (!multiselect && selectedOptions.length === 1 && (inputValue.length < 1 || !matchingOption)) {
          clearSelection(event);
        }
      }),
      onBlur: useEventCallback((event: React.FocusEvent<HTMLInputElement>) => {
        triggerFromProps.onBlur?.(event);
        // handle selection and updating value if freeform is false
        if (!open && !freeform) {
          const activeOptionId = activeDescendantController.active();
          const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;
          // select matching option, if the value fully matches
          if (value && activeOption && value.trim().toLowerCase() === activeOption?.text.toLowerCase()) {
            selectOption(event, activeOption);
          }

          // reset typed value when the input loses focus while collapsed, unless freeform is true
          setValue(undefined);
        }
      }),
      onKeyDown: useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open && getDropdownActionFromKey(event) === 'Type') {
          setOpen(event, true);
        }
        // clear activedescendant when moving the text insertion cursor
        if (event.key === ArrowLeft || event.key === ArrowRight) {
          activeDescendantController.hideAttributes();
        } else {
          activeDescendantController.showAttributes();
        }

        // update typing state to true if the user is typing
        const action = getDropdownActionFromKey(event, { open, multiselect });
        if (action === 'Type') {
          isTyping.current = true;
        }
        // otherwise, update the typing state to false if opening or navigating dropdown options
        // other actions, like closing the dropdown, should not impact typing state.
        else if (
          (action === 'Open' && event.key !== ' ') ||
          action === 'Next' ||
          action === 'Previous' ||
          action === 'First' ||
          action === 'Last' ||
          action === 'PageUp' ||
          action === 'PageDown'
        ) {
          isTyping.current = false;
        }

        // allow space to insert a character if freeform & the last action was typing, or if the popup is closed
        if ((isTyping.current || !open) && event.key === ' ') {
          triggerFromProps?.onKeyDown?.(event);
          return;
        }

        triggerFromProps.onKeyDown?.(event);
      }),
    },
    ref,
    {
      state: options.state,
      defaultProps,
      elementType: 'input',
      activeDescendantController,
    },
  );
  return trigger;
}
