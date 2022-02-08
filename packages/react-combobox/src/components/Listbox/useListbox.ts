import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { useOrderedGroup } from '../../utils/useOrderedGroup';
import { useSelection } from '../../utils/useSelection';
import { DropdownActions, getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ListboxProps, ListboxState } from './Listbox.types';
import { OptionValue } from '../../utils/OrderedGroup.types';

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
    groupData: { count, getOptionAtIndex, getOptionByKey, getIndexOfKey },
  } = orderedGroup;

  const [selectedKeys, selectKey] = useSelection(props);

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveOption(getOptionByKey(optionKey));

    // handle selection change
    selectKey(optionKey);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = count - 1;
    const activeIndex = activeOption ? getIndexOfKey(activeOption.key) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Select:
      case DropdownActions.CloseSelect:
        activeOption && selectKey(activeOption.key);
        break;
      default:
        newIndex = getIndexFromAction(action, activeIndex, maxIndex);
    }

    if (newIndex !== activeIndex) {
      // prevent default page scroll/keyboard action if the index changed
      event.preventDefault();
      setActiveOption(getOptionAtIndex(newIndex));
    }
  };

  // get state from parent combobox, if it exists
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const contextValues = useContextSelector(ComboboxContext, ctx => ({
    activeOption: ctx.activeOption,
    onOptionClick: ctx.onOptionClick,
    registerOption: ctx.registerOption,
    selectedKeys: ctx.selectedKeys,
    unRegisterOption: ctx.unRegisterOption,
  }));

  // without a parent combobox context, provide values directly from Listbox
  const standaloneListboxValues = {
    activeOption,
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
      'aria-activedescendant': hasComboboxContext ? undefined : activeOption?.id,
      'aria-multiselectable': multiselect,
      tabIndex: 0,
      onKeyDown,
      ...props,
    }),
    ...orderedGroup,
    ...(hasComboboxContext ? contextValues : standaloneListboxValues),
  };
};
