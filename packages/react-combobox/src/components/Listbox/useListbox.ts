import * as React from 'react';
import { getNativeElementProps, useControllableState } from '@fluentui/react-utilities';
import { useOrderedGroup } from '../../utils/useOrderedGroup';
import { DropdownActions, getDropdownActionFromKey } from '../../utils/getDropdownActionFromKey';
import type { ListboxProps, ListboxSlots, ListboxState } from './Listbox.types';

/**
 * Array of all shorthand properties listed in ListboxSlots
 */
export const listboxShorthandProps: (keyof ListboxSlots)[] = ['root'];

/**
 * Create the state required to render Listbox.
 *
 * The returned state can be modified with hooks such as useListboxStyles_unstable,
 * before being passed to renderListbox_unstable.
 *
 * @param props - props from this instance of Listbox
 * @param ref - reference to root HTMLElement of Listbox
 */
export const useListbox = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  const { multiselect } = props;
  const orderedGroup = useOrderedGroup(props.children);
  const {
    groupData: { count, getIdAtIndex, getIndexOfId },
  } = orderedGroup;
  const [activeId, setActiveId] = React.useState<string | undefined>();

  const [selectedKeys, setSelectedKeys] = useControllableState({
    state: props.selectedKeys,
    defaultState: props.initialSelectedKeys,
    initialState: [],
  });

  // just for testing
  // const ids = Array.from(Array(count)).map((num, index) => getIdAtIndex(index));
  // console.log('group info:', count, ...ids);
  // end testing

  const selectOption = (optionKey: string) => {
    if (multiselect) {
      const selectedIndex = selectedKeys.indexOf(optionKey);
      if (selectedIndex) {
        setSelectedKeys(selectedKeys.filter(key => key !== optionKey));
      } else {
        setSelectedKeys([...selectedKeys, optionKey]);
      }
    } else {
      setSelectedKeys([optionKey]);
    }

    props.onSelect?.(optionKey);
  };

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveId(optionKey);

    // handle selection change
    selectOption(optionKey);
  };

  // TODO: move somewhere shared w/ Combobox
  const onKeyDown = (event: KeyboardEvent) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = count - 1;
    const activeIndex = activeId ? getIndexOfId(activeId) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Select:
      case DropdownActions.CloseSelect:
        activeId && selectOption(activeId);
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
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'listbox',
      'aria-activedescendant': activeId,
      'aria-multiselectable': multiselect,
      tabIndex: 0,
      onKeyDown,
      ...props,
    }),
    ...orderedGroup,
    activeId,
    onOptionClick,
    selectedKeys,
  };
};
