import * as React from 'react';
import { Offset, resolvePositioningShorthand, usePopper } from '@fluentui/react-positioning';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useEventCallback,
  useFirstMount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { OptionValue } from '../../utils/OptionCollection.types';
import { useSelection } from '../../utils/useSelection';
import { Listbox } from '../Listbox/Listbox';
import { ComboButton } from '../ComboButton/ComboButton';
import type { ComboboxProps, ComboboxState, ComboboxOpenEvents } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLButtonElement>): ComboboxState => {
  const optionCollection = useOptionCollection();

  const {
    appearance = 'outline',
    inline = false,
    multiselect,
    onOpenChange,
    placeholder,
    positioning,
    size = 'medium',
  } = props;
  const { getCount, getOptionAtIndex, getIndexOfId, getOptionById, getOptionsMatchingValue } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();
  const { selectedOptions, selectOption } = useSelection(props);
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  // handle trigger focus/blur
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const ignoreTriggerBlur = React.useRef(false);

  // popper
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: [0, 2] as Offset,
    ...resolvePositioningShorthand(positioning),
  };

  const {
    targetRef: popperTargetRef,
    containerRef: popperContainerRef,
  }: {
    targetRef: React.MutableRefObject<HTMLButtonElement>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
  } = usePopper(popperOptions);

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

  const setOpen = (event: ComboboxOpenEvents, newState: boolean) => {
    onOpenChange?.(event, { open: newState });
    setOpenState(newState);
  };

  const onOptionClick = useEventCallback((event: React.MouseEvent<HTMLElement>, option: OptionValue) => {
    // clicked option should always become active option
    setActiveOption(getOptionById(option.id));

    // close on option click for single-select
    !multiselect && setOpen(event, false);

    // handle selection change
    selectOption(event, option.value);
  });

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  const state: ComboboxState = {
    components: {
      root: 'div',
      listbox: Listbox,
      trigger: ComboButton,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        children: props.children,
        ...rootNativeProps,
      },
    }),
    listbox: resolveShorthand(props.listbox, {
      required: true,
      defaultProps: {
        ref: popperContainerRef,
        multiselect,
        tabIndex: undefined,
      },
    }),
    trigger: resolveShorthand(props.trigger, {
      required: true,
      defaultProps: {
        ref: useMergedRefs(ref, triggerRef, popperTargetRef),
        'aria-expanded': open,
        'aria-activedescendant': open ? activeOption?.id : undefined,
        placeholder,
        value,
        ...triggerNativeProps,
      },
    }),
    ...optionCollection,
    activeOption,
    appearance,
    inline,
    onOptionClick,
    open,
    selectedOptions,
    size,
    value,
  };

  /*
   * Handle focus when clicking the listbox popup:
   * 1. Move focus back to the button/input when the listbox is clicked (otherwise it goes to body)
   * 2. Do not close the listbox on button/input blur when clicking into the listbox
   */
  const { onClick: onListboxClick, onMouseDown: onListboxMouseDown } = state.listbox;
  state.listbox.onClick = event => {
    triggerRef.current?.focus();

    onListboxClick?.(event);
  };

  state.listbox.onMouseDown = event => {
    ignoreTriggerBlur.current = true;

    onListboxMouseDown?.(event);
  };

  // the trigger should open/close the popup on click or blur
  const { onBlur: onTriggerBlur, onClick: onTriggerClick, onKeyDown: onTriggerKeyDown } = state.trigger;
  state.trigger.onBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!ignoreTriggerBlur.current) {
      setOpen(event, false);
    }

    ignoreTriggerBlur.current = false;

    onTriggerBlur?.(event);
  };

  state.trigger.onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event, !open);

    onTriggerClick?.(event);
  };

  // handle combobox keyboard interaction
  state.trigger.onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const action = getDropdownActionFromKey(event, { open, multiselect });
    const maxIndex = getCount() - 1;
    const activeIndex = activeOption ? getIndexOfId(activeOption.id) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case 'Open':
        event.preventDefault();
        setOpen(event, true);
        break;
      case 'Close':
        // stop propagation for escape key to avoid dismissing any parent popups
        event.stopPropagation();
        event.preventDefault();
        setOpen(event, false);
        break;
      case 'CloseSelect':
        !multiselect && setOpen(event, false);
      // fallthrough
      case 'Select':
        activeOption && !activeOption.disabled && selectOption(event, activeOption.value);
        event.preventDefault();
        break;
      case 'Tab':
        activeOption && selectOption(event, activeOption.value);
        break;
      default:
        newIndex = getIndexFromAction(action, activeIndex, maxIndex);
    }
    if (newIndex !== activeIndex) {
      // prevent default page scroll/keyboard action if the index changed
      event.preventDefault();
      setActiveOption(getOptionAtIndex(newIndex));
    }

    onTriggerKeyDown?.(event);
  };

  return state;
};
