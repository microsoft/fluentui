import * as React from 'react';
import { useControllableState, useFirstMount } from '@fluentui/react-utilities';
import { useOptionCollection } from '../utils/useOptionCollection';
import { OptionValue } from '../utils/OptionCollection.types';
import { useSelection } from '../utils/useSelection';
import type { ComboboxBaseProps, ComboboxBaseOpenEvents, ComboboxBaseState } from './ComboboxBase.types';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';

/**
 * State shared between Combobox and Dropdown components
 */
export const useComboboxBaseState = (
  props: ComboboxBaseProps & {
    children?: React.ReactNode;
    editable?: boolean;
    activeDescendantImperativeRef: React.RefObject<ActiveDescendantImperativeRef>;
  },
): ComboboxBaseState => {
  const {
    appearance = 'outline',
    children,
    editable = false,
    inlinePopup = false,
    mountNode = undefined,
    multiselect,
    onOpenChange,
    size = 'medium',
    activeDescendantImperativeRef,
  } = props;

  const optionCollection = useOptionCollection();
  const { getOptionsMatchingValue } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  // track whether keyboard focus outline should be shown
  // tabster/keyborg doesn't work here, since the actual keyboard focus target doesn't move
  const [focusVisible, setFocusVisible] = React.useState(false);

  // track focused state to conditionally render collapsed listbox
  // when the trigger is focused - the listbox should but hidden until the open state is changed
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

  // update active option based on change in open state or children
  React.useEffect(() => {
    if (open) {
      // if it is single-select and there is a selected option, start at the selected option
      if (!multiselect && selectedOptions.length > 0) {
        const selectedOption = getOptionsMatchingValue(v => v === selectedOptions[0]).pop();
        if (selectedOption?.id) {
          activeDescendantImperativeRef.current?.focus(selectedOption.id);
        }
      } else {
        // default to starting at the first option
        activeDescendantImperativeRef.current?.first();
      }
    } else if (!open) {
      // reset the active option when closing
      activeDescendantImperativeRef.current?.blur();
    }
    // this should only be run in response to changes in the open state or children
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, children]);

  return {
    ...optionCollection,
    ...selectionState,
    activeOption,
    appearance,
    focusVisible,
    hasFocus,
    ignoreNextBlur,
    inlinePopup,
    mountNode,
    open,
    setActiveOption,
    setFocusVisible,
    setHasFocus,
    setOpen,
    setValue,
    size,
    value,
    multiselect,
    activeDescendantImperativeRef,
  };
};
