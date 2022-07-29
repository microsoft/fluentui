import * as React from 'react';
import { useControllableState, useFirstMount } from '@fluentui/react-utilities';
import { useOptionCollection } from '../utils/useOptionCollection';
import { OptionValue } from '../utils/OptionCollection.types';
import { useSelection } from '../utils/useSelection';
import type { ComboboxBaseProps, ComboboxBaseOpenEvents } from './ComboboxBase.types';

/**
 * State shared between Combobox and Dropdown components
 */
export const useComboboxBaseState = (props: ComboboxBaseProps) => {
  const { appearance = 'outline', inlinePopup = false, multiselect, onOpenChange, size = 'medium' } = props;

  const optionCollection = useOptionCollection();
  const { getOptionAtIndex, getOptionById, getOptionsMatchingValue } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();
  const { selectedOptions, selectOption } = useSelection(props);

  // update value based on selectedOptions
  const isFirstMount = useFirstMount();
  const value = React.useMemo(() => {
    // don't compute value if it is defined through props,
    if (props.value !== undefined) {
      return props.value;
    }

    if (isFirstMount && props.defaultValue !== undefined) {
      return props.defaultValue;
    }

    if (multiselect) {
      return selectedOptions.join(', ');
    }

    return selectedOptions[0];
  }, [isFirstMount, multiselect, props.defaultValue, props.value, selectedOptions]);

  // Handle open state, which is shared with options in context
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const setOpen = (event: ComboboxBaseOpenEvents, newState: boolean) => {
    onOpenChange?.(event, { open: newState });
    setOpenState(newState);
  };

  const onOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionValue) => {
    // clicked option should always become active option
    setActiveOption(getOptionById(option.id));

    // close on option click for single-select
    !multiselect && setOpen(event, false);

    // handle selection change
    selectOption(event, option);
  };

  // update active option based on change in open state
  React.useEffect(() => {
    if (open) {
      // if there is a selection, start at the most recently selected item
      if (selectedOptions.length > 0) {
        const lastSelectedOption = getOptionsMatchingValue(
          v => v === selectedOptions[selectedOptions.length - 1],
        ).pop();
        lastSelectedOption && setActiveOption(lastSelectedOption);
      }
      // default to starting at the first option
      else {
        setActiveOption(getOptionAtIndex(0));
      }
    } else {
      // reset the active option when closing
      setActiveOption(undefined);
    }
    // this should only be run in response to changes in the open state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    ...optionCollection,
    activeOption,
    appearance,
    inlinePopup,
    onOptionClick,
    open,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
    value,
  };
};
