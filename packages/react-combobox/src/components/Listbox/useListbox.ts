import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  const orderedGroup = useOrderedGroup(props.children);
  const {
    groupData: { count, getIdAtIndex, getIndexOfId },
  } = orderedGroup;
  const [activeId, setActiveId] = React.useState<string | undefined>();

  // just for testing
  const ids = Array.from(Array(count)).map((num, index) => getIdAtIndex(index));
  console.log('group info:', count, ...ids);
  // end testing

  const onKeyDown = (event: KeyboardEvent) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = count - 1;
    const activeIndex = activeId ? getIndexOfId(activeId) : -1;
    let newIndex = activeIndex;

    switch (action) {
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
      // case DropdownActions.Type:
      //   // always prevent default and stop propagation when typing
      //   e.preventDefault();
      //   e.stopPropagation();

      //   const matchingIndex = findByCharacter(e.key);
      //   newIndex = matchingIndex > -1 ? matchingIndex : activeIndex;
      //   break;
      // TODO: pageup and pagedown, should increment be customizable?
    }

    if (newIndex !== activeIndex) {
      // prevent default scroll/keyboard action if the index changed
      event.preventDefault();
      console.log('update index to', newIndex);
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
      tabIndex: 0,
      onKeyDown,
      ...props,
    }),
    ...orderedGroup,
    activeId,
  };
};
