import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComboboxBaseOpenEvents, ComboboxBaseProps, ComboboxBaseState } from './ComboboxBase.types';
import { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { useControllableState, useEventCallback, useFirstMount } from '@fluentui/react-utilities';
import { OptionValue } from './OptionCollection.types';
import { useOptionCollection } from './useOptionCollection';
import { useSelection } from './useSelection';
import { SelectionEvents } from './Selection.types';

/**
 * @internal
 * State shared between Combobox and Dropdown components
 */
export const useComboboxBaseState = (
  props: ComboboxBaseProps & {
    children?: React.ReactNode;
    editable?: boolean;
    disabled?: boolean;
    activeDescendantController: ActiveDescendantImperativeRef;
  },
): ComboboxBaseState => {
  const {
    appearance = 'outline',
    children,
    clearable = false,
    editable = false,
    inlinePopup = false,
    freeform = false,
    disabled = false,
    mountNode = undefined,
    multiselect,
    onOpenChange,
    size = 'medium',
    activeDescendantController,
  } = props;

  const optionCollection = useOptionCollection();
  const { getOptionsMatchingValue } = optionCollection;

  const { getOptionById } = optionCollection;
  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : undefined;
  }, [activeDescendantController, getOptionById]);

  // Keeping some kind of backwards compatible functionality here
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const UNSAFE_activeOption = getActiveOption();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const UNSAFE_setActiveOption = React.useCallback(
    (option: OptionValue | undefined | ((prev: OptionValue | undefined) => OptionValue | undefined)) => {
      let nextOption: OptionValue | undefined = undefined;
      if (typeof option === 'function') {
        const activeOption = getActiveOption();
        nextOption = option(activeOption);
      }

      if (nextOption) {
        activeDescendantController.focus(nextOption.id);
      } else {
        activeDescendantController.blur();
      }
    },
    [activeDescendantController, getActiveOption],
  );

  // track whether keyboard focus outline should be shown
  // tabster/keyborg doesn't work here, since the actual keyboard focus target doesn't move
  const [focusVisible, setFocusVisible] = React.useState(false);

  // track focused state to conditionally render collapsed listbox
  // when the trigger is focused - the listbox should be hidden until the open state is changed
  const [hasFocus, setHasFocus] = React.useState(false);

  const ignoreNextBlur = React.useRef(false);

  const { selectedOptions, selectOption: baseSelectOption, clearSelection } = useSelection(props);

  // calculate value based on props, internal value changes, and selected options
  const isFirstMount = useFirstMount();
  const [controllableValue, setValue] = useControllableState({
    state: props.value,
    initialState: undefined,
  });

  // reset any typed value when an option is selected
  const selectOption = React.useCallback(
    (ev: SelectionEvents, option: OptionValue) => {
      ReactDOM.unstable_batchedUpdates(() => {
        setValue(undefined);
        baseSelectOption(ev, option);
      });
    },
    [setValue, baseSelectOption],
  );

  const value = React.useMemo(() => {
    // don't compute the value if it is defined through props or setValue,
    if (controllableValue !== undefined) {
      return controllableValue;
    }

    // handle defaultValue here, so it is overridden by selection
    if (isFirstMount && props.defaultValue !== undefined) {
      return props.defaultValue;
    }

    const selectedOptionsText = getOptionsMatchingValue(optionValue => {
      return selectedOptions.includes(optionValue);
    }).map(option => option.text);

    if (multiselect) {
      // editable inputs should not display multiple selected options in the input as text
      return editable ? '' : selectedOptionsText.join(', ');
    }

    return selectedOptionsText[0];

    // do not change value after isFirstMount changes,
    // we do not want to accidentally override defaultValue on a second render
    // unless another value is intentionally set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllableValue, editable, getOptionsMatchingValue, multiselect, props.defaultValue, selectedOptions]);

  // Handle open state, which is shared with options in context
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const setOpen = React.useCallback(
    (event: ComboboxBaseOpenEvents, newState: boolean) => {
      onOpenChange?.(event, { open: newState });
      setOpenState(newState);
    },
    [onOpenChange, setOpenState],
  );

  // update active option based on change in open state
  React.useEffect(() => {
    if (open) {
      // if it is single-select and there is a selected option, start at the selected option
      if (!multiselect && selectedOptions.length > 0) {
        const selectedOption = getOptionsMatchingValue(v => v === selectedOptions[0]).pop();
        if (selectedOption?.id) {
          activeDescendantController.focus(selectedOption.id);
        }
      }
    } else {
      activeDescendantController.blur();
    }
    // this should only be run in response to changes in the open state or children
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeDescendantController]);

  // Fallback focus when children are updated in an open popover results in no item being focused
  React.useEffect(() => {
    if (open) {
      if (!activeDescendantController.active()) {
        activeDescendantController.first();
      }
    }
    // this should only be run in response to changes in the open state or children
  }, [open, children, activeDescendantController]);

  return {
    ...optionCollection,
    selectedOptions,
    selectOption,
    clearSelection,
    freeform,
    disabled,
    activeOption: UNSAFE_activeOption,
    appearance,
    clearable,
    focusVisible,
    ignoreNextBlur,
    inlinePopup,
    mountNode,
    open,
    hasFocus,
    setActiveOption: UNSAFE_setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
    setValue,
    size,
    value,
    multiselect,
    onOptionClick: useEventCallback((e: React.MouseEvent<HTMLElement>) => {
      if (!multiselect) {
        setOpen(e, false);
      }
    }),
  };
};
