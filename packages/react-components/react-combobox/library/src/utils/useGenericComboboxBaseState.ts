import { ActiveDescendantChangeEvent, ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { ComboboxBaseOpenEvents, ComboboxBaseProps, ComboboxBaseState } from './ComboboxBase.types';
import { useOptionCollection } from './useOptionCollection';
import { useControllableState, useEventCallback, useFirstMount } from '@fluentui/react-utilities';
import * as React from 'react';
import { OptionValue } from './OptionCollection.types';
import * as ReactDOM from 'react-dom';
import { SelectionEvents } from './Selection.types';
import { useSelection } from './useSelection';

export type GenericComboboxState = Omit<ComboboxBaseState, 'appearance' | 'size' | 'setActiveOption'>;

export type GenericComboboxBaseStateOptions = Pick<
  ComboboxBaseProps,
  | 'onOpenChange'
  | 'value'
  | 'selectedOptions'
  | 'defaultSelectedOptions'
  | 'multiselect'
  | 'onOptionSelect'
  | 'defaultValue'
  | 'defaultOpen'
  | 'open'
  | 'onActiveOptionChange'
  | 'inlinePopup'
  | 'clearable'
  | 'mountNode'
> & {
  children?: React.ReactNode;
  editable?: boolean;
  disabled?: boolean;
  freeform?: boolean;
  activeDescendantController: ActiveDescendantImperativeRef;
};

/**
 * Base state for components that do not need the slot resolution portion of useComboboxBaseState.
 */
export const useGenericComboboxBaseState = (props: GenericComboboxBaseStateOptions): GenericComboboxState => {
  const {
    children,
    clearable = false,
    editable = false,
    inlinePopup = false,
    mountNode = undefined,
    multiselect,
    onOpenChange,
    activeDescendantController,
    freeform = true,
    disabled = false,
    onActiveOptionChange = null,
  } = props;

  const optionCollection = useOptionCollection();
  const { getOptionsMatchingValue, getOptionById } = optionCollection;

  // track whether keyboard focus outline should be shown
  // tabster/keyborg doesn't work here, since the actual keyboard focus target doesn't move
  const [focusVisible, setFocusVisible] = React.useState(false);

  // track focused state to conditionally render collapsed listbox
  // when the trigger is focused - the listbox should but hidden until the open state is changed
  const [hasFocus, setHasFocus] = React.useState(false);

  const ignoreNextBlur = React.useRef(false);

  // calculate value based on props, internal value changes, and selected options
  const isFirstMount = useFirstMount();
  const [controllableValue, setValue] = useControllableState({
    state: props.value,
    initialState: undefined,
  });

  const { selectedOptions, selectOption: baseSelectOption, clearSelection } = useSelection(props);

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
      if (disabled) {
        return;
      }
      onOpenChange?.(event, { open: newState });
      ReactDOM.unstable_batchedUpdates(() => {
        if (!newState && !freeform) {
          setValue(undefined);
        }
        setOpenState(newState);
      });
    },
    [onOpenChange, setOpenState, setValue, freeform, disabled],
  );

  // Fallback focus when children are updated in an open popover results in no item being focused
  React.useEffect(() => {
    if (open) {
      if (!activeDescendantController.active()) {
        activeDescendantController.first();
      }
    }
    // this should only be run in response to changes in the open state or children
  }, [open, children, activeDescendantController, getOptionById]);

  const onActiveDescendantChange = useEventCallback((event: ActiveDescendantChangeEvent) => {
    const previousOption = event.detail.previousId ? optionCollection.getOptionById(event.detail.previousId) : null;
    const nextOption = optionCollection.getOptionById(event.detail.id);
    onActiveOptionChange?.(event, { event, type: 'change', previousOption, nextOption });
  });

  return {
    ...optionCollection,
    freeform,
    disabled,
    selectOption,
    clearSelection,
    selectedOptions,
    clearable,
    focusVisible,
    ignoreNextBlur,
    inlinePopup,
    mountNode,
    open,
    hasFocus,
    setFocusVisible,
    setHasFocus,
    setOpen,
    setValue,
    value,
    multiselect,
    onOptionClick: useEventCallback((e: React.MouseEvent<HTMLElement>) => {
      if (!multiselect) {
        setOpen(e, false);
      }
    }),
    onActiveDescendantChange,
  };
};
