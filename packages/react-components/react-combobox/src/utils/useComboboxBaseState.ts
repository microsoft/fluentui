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
  const { getOptionAtIndex, getOptionsMatchingValue } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  // track focused state to conditionally render collapsed listbox
  const [hasFocus, setHasFocus] = React.useState(false);

  const ignoreNextBlur = React.useRef(false);

  const selectionState = useSelection(props);
  const { selectedOptions } = selectionState;

  // calculate value based on props, internal value changes, and selected options
  const isFirstMount = useFirstMount();
  const [controllableValue, setValue] = useControllableState({
    state: props.value,
    initialState: undefined,
  });

  const value = React.useMemo(() => {
    // don't compute the value if it is defined through props or setValue,
    if (controllableValue !== undefined) {
      return controllableValue;
    }

    // handle defaultValue here, so it is overridden by selection
    if (isFirstMount && props.defaultValue !== undefined) {
      return props.defaultValue;
    }

    if (multiselect) {
      return selectedOptions.join(', ');
    }

    return selectedOptions[0];
  }, [controllableValue, isFirstMount, multiselect, props.defaultValue, selectedOptions]);

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

  // update active option based on change in open state
  React.useEffect(() => {
    if (open && !activeOption) {
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
    } else if (!open) {
      // reset the active option when closing
      setActiveOption(undefined);
    }
    // this should only be run in response to changes in the open state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    ...optionCollection,
    ...selectionState,
    activeOption,
    appearance,
    hasFocus,
    ignoreNextBlur,
    inlinePopup,
    open,
    setActiveOption,
    setHasFocus,
    setOpen,
    setValue,
    size,
    value,
  };
};
