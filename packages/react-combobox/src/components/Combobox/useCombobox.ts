import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useControllableState } from '@fluentui/react-utilities';
import { DropdownActions, getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { useOrderedGroup } from '../../utils/useOrderedGroup';
import { useSelection } from '../../utils/useSelection';
import { Listbox } from '../Listbox';
import { ComboButton } from '../ComboButton';
import type { ComboboxProps, ComboboxSlots, ComboboxState } from './Combobox.types';

/**
 * Array of all shorthand properties listed in ComboboxSlots
 */
export const comboboxShorthandProps: (keyof ComboboxSlots)[] = ['root', 'listbox', 'trigger'];

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox = (props: ComboboxProps, ref: React.Ref<HTMLElement>): ComboboxState => {
  const { multiselect, open: controlledOpen, placeholder, value: controlledValue } = props;
  const orderedGroup = useOrderedGroup(props.children);
  const {
    options,
    groupData: { count, getIdAtIndex, getIndexOfId, getOptionAtId },
  } = orderedGroup;

  const [activeId, setActiveId] = React.useState<string | undefined>();
  const [selectedKeys, selectKey] = useSelection(props);

  const [value, setValue] = useControllableState({
    state: controlledValue,
    initialState: undefined,
  });

  const [open, setOpen] = useControllableState({
    state: controlledOpen,
    initialState: false,
  });

  const selectOption = (optionKey: string) => {
    // update selection
    selectKey(optionKey);

    // update value
    const selectedOption = getOptionAtId(optionKey);

    if (multiselect) {
      setValue(selectedKeys.join(', '));
    } else {
      setValue(selectedOption.value);
    }
  };

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveId(optionKey);

    // close on option click for single-select
    !multiselect && setOpen(false);

    // handle selection change
    selectOption(optionKey);
  };

  const onTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const action = getDropdownActionFromKey(event, { open, multiselect });
    const maxIndex = count - 1;
    const activeIndex = activeId ? getIndexOfId(activeId) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Open:
        event.preventDefault();
        setOpen(true);
        break;
      case DropdownActions.Close:
        // stop propagation for escape key to prevent nested dismiss issues
        event.stopPropagation();
        event.preventDefault();
        setOpen(false);
        break;
      case DropdownActions.CloseSelect:
        setOpen(false);
      // fallthrough
      case DropdownActions.Select:
        activeId && selectOption(activeId);
        event.preventDefault();
        break;
      default:
        newIndex = getIndexFromAction(action, activeIndex, maxIndex);
    }
    if (newIndex !== activeIndex) {
      // prevent default page scroll/keyboard action if the index changed
      event.preventDefault();
      setActiveId(getIdAtIndex(newIndex));
    }
  };

  return {
    components: {
      root: 'div',
      listbox: Listbox,
      trigger: ComboButton,
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
<<<<<<< HEAD
=======
    listbox: resolveShorthand(props.listbox, {
      required: true,
      defaultProps: {
        tabIndex: undefined,
      },
    }),
    trigger: resolveShorthand(props.trigger, {
      required: true,
      defaultProps: {
        placeholder,
        value,
        onClick: onTriggerClick,
        onKeyDown,
      },
    }),
    ...orderedGroup,
    activeId,
    onOptionClick,
    open,
    options,
    selectedKeys,
    value,
>>>>>>> combobox with trigger
  };
};
