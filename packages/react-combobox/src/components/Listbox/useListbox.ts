import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  const optionCollection = useOptionCollection();
  const { getCount, getOptionAtIndex, getOptionById, getIndexOfId } = optionCollection;

  const { selectedOptions, selectOption } = useSelection(props);

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  const onOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionValue) => {
    // clicked option should always become active option
    setActiveOption(getOptionById(option.id));

    // handle selection change
    selectOption(event, option.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = getCount() - 1;
    const activeIndex = activeOption ? getIndexOfId(activeOption.id) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case 'Select':
      case 'CloseSelect':
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
  };

  // get state from parent combobox, if it exists
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const comboboxActiveOption = useContextSelector(ComboboxContext, ctx => ctx.activeOption);
  const comboboxOnOptionClick = useContextSelector(ComboboxContext, ctx => ctx.onOptionClick);
  const comboboxSelectedOptions = useContextSelector(ComboboxContext, ctx => ctx.selectedOptions);

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = hasComboboxContext
    ? {
        activeOption: comboboxActiveOption,
        onOptionClick: comboboxOnOptionClick,
        selectedOptions: comboboxSelectedOptions,
      }
    : {
        activeOption,
        onOptionClick,
        selectedOptions,
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
    multiselect,
    ...optionCollection,
    ...optionContextValues,
  };
};
