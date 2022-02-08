import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { useOrderedGroup } from '../../utils/useOrderedGroup';
import { useSelection } from '../../utils/useSelection';
import { DropdownActions, getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ListboxProps, ListboxState } from './Listbox.types';

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

  const [selectedKeys, selectKey] = useSelection(props);

  const [activeId, setActiveId] = React.useState<string | undefined>();

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveId(optionKey);

    // handle selection change
    selectKey(optionKey);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = count - 1;
    const activeIndex = activeId ? getIndexOfId(activeId) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Select:
      case DropdownActions.CloseSelect:
        activeId && selectKey(activeId);
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

  // get state from parent combobox, if it exists
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const contextValues = useContextSelector(ComboboxContext, ctx => ({
    activeId: ctx.activeId,
    onOptionClick: ctx.onOptionClick,
    registerOption: ctx.registerOption,
    selectedKeys: ctx.selectedKeys,
    unRegisterOption: ctx.unRegisterOption,
  }));

  // without a parent combobox context, provide values directly from Listbox
  const standaloneListboxValues = {
    activeId,
    onOptionClick,
    selectedKeys,
  };

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      role: 'listbox',
      'aria-activedescendant': hasComboboxContext ? undefined : activeId,
      'aria-multiselectable': multiselect,
      tabIndex: 0,
      onKeyDown,
      ...props,
    }),
    ...orderedGroup,
    ...(hasComboboxContext ? contextValues : standaloneListboxValues),
  };
};
