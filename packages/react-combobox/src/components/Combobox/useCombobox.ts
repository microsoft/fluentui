import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useControllableState } from '@fluentui/react-utilities';
import { DropdownActions, getDropdownActionFromKey } from '../../utils/getDropdownActionFromKey';
import { useOrderedGroup } from '../../utils/useOrderedGroup';
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
  const {
    initialSelectedKeys = [],
    multiselect,
    open: controlledOpen,
    placeholder,
    selectedKeys: controlledSelectedKeys,
    value: controlledValue,
    onChange,
  } = props;
  const orderedGroup = useOrderedGroup(props.children);
  const {
    options,
    groupData: { count, getIdAtIndex, getIndexOfId, getOptionAtId },
  } = orderedGroup;

  const [activeId, setActiveId] = React.useState<string | undefined>();

  const [value, setValue] = useControllableState({
    state: controlledValue,
    initialState: undefined,
  });

  const [open, setOpen] = useControllableState({
    state: controlledOpen,
    initialState: false,
  });

  const [selectedKeys, setSelectedKeys] = useControllableState({
    state: controlledSelectedKeys,
    defaultState: [],
    initialState: initialSelectedKeys,
  });

  const selectOption = (optionKey: string) => {
    const selectedIndex = getIndexOfId(optionKey);
    const selectedOption = getOptionAtId(optionKey);

    if (multiselect) {
      if (selectedIndex) {
        setSelectedKeys(selectedKeys.filter(key => key !== optionKey));
      } else {
        setSelectedKeys([...selectedKeys, optionKey]);
      }
    } else {
      setSelectedKeys([optionKey]);
      setValue(selectedOption.value);
    }

    onChange?.(optionKey, true);
  };

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveId(optionKey);

    // for now, ignore multiselect
    setOpen(false);

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
      case DropdownActions.Next:
        newIndex = Math.min(maxIndex, activeIndex + 1);
        break;
      case DropdownActions.Previous:
        newIndex = Math.max(0, activeIndex - 1);
        break;
      case DropdownActions.First:
        newIndex = 0;
        break;
      case DropdownActions.Last:
        newIndex = maxIndex;
        break;
      // TODO: for pageup and pagedown, should increment be customizable?
      case DropdownActions.PageDown:
        newIndex = Math.min(maxIndex, activeIndex + 10);
        break;
      case DropdownActions.PageUp:
        newIndex = Math.max(0, activeIndex - 10);
        break;
      // case DropdownActions.Type:
      //   // always prevent default and stop propagation when typing
      //   e.preventDefault();
      //   e.stopPropagation();

      //   const matchingIndex = findByCharacter(e.key);
      //   newIndex = matchingIndex > -1 ? matchingIndex : activeIndex;
      //   break;
    }
    if (newIndex !== activeIndex) {
      // prevent default scroll/keyboard action only if the index changed
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
