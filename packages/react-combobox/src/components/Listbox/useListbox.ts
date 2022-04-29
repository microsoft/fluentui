import * as React from 'react';
import { getNativeElementProps, useId, useMergedRefs } from '@fluentui/react-utilities';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { useSelection } from '../../utils/useSelection';
import { getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ListboxProps, ListboxState } from './Listbox.types';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { OptionValue } from '../../utils/OptionCollection.types';

/**
 * Create the state required to render Listbox.
 *
 * The returned state can be modified with hooks such as useListboxStyles_unstable,
 * before being passed to renderListbox_unstable.
 *
 * @param props - props from this instance of Listbox
 * @param ref - reference to root HTMLElement of Listbox
 */
export const useListbox_unstable = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  const { multiselect } = props;
  const optionCollection = useOptionCollection(props.children);
  const {
    collectionData: { count, getOptionAtIndex, getOptionByKey, getIndexOfKey },
  } = optionCollection;
  const idBase = useId('listbox');

  const { selectedOptions, selectOption } = useSelection(props);

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  const onOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionValue) => {
    // clicked option should always become active option
    setActiveOption(getOptionByKey(option.key));

    // handle selection change
    selectOption(event, option);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = count - 1;
    const activeIndex = activeOption ? getIndexOfKey(activeOption.key) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case 'Select':
      case 'CloseSelect':
        activeOption && selectOption(event, activeOption);
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
  const comboboxActiveOption = useContextSelector(ComboboxContext, ctx => ctx.activeOption);
  const comboboxIdBase = useContextSelector(ComboboxContext, ctx => ctx.idBase);
  const comboboxOnListboxClick = useContextSelector(ComboboxContext, ctx => ctx.onListboxClick);
  const comboboxOnListboxMouseDown = useContextSelector(ComboboxContext, ctx => ctx.onListboxMouseDown);
  const comboboxOnOptionClick = useContextSelector(ComboboxContext, ctx => ctx.onOptionClick);
  const comboboxRef = useContextSelector(ComboboxContext, ctx => ctx.popperContainerRef);
  const comboboxSelectedOptions = useContextSelector(ComboboxContext, ctx => ctx.selectedOptions);

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = hasComboboxContext
    ? {
        activeOption: comboboxActiveOption,
        idBase: comboboxIdBase,
        onOptionClick: comboboxOnOptionClick,
        selectedOptions: comboboxSelectedOptions,
      }
    : {
        activeOption,
        idBase,
        onOptionClick,
        selectedOptions,
      };

  const state: ListboxState = {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref: useMergedRefs(ref, comboboxRef),
      role: 'listbox',
      'aria-activedescendant': hasComboboxContext ? undefined : activeOption?.id,
      'aria-multiselectable': multiselect,
      tabIndex: 0,
      onKeyDown,
      ...props,
    }),
    ...optionCollection,
    ...optionContextValues,
  };

  state.root.onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    comboboxOnListboxClick?.();
    props.onClick?.(event);
  };

  state.root.onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    comboboxOnListboxMouseDown?.();
    props.onMouseDown?.(event);
  };

  return state;
};
