import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useEventCallback,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import type { OptionValue } from '../../utils/OptionCollection.types';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { useScrollOptionsIntoView } from '../../utils/useScrollOptionsIntoView';
import { useSelection } from '../../utils/useSelection';
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
export const useListbox_unstable = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  const { multiselect } = props;
  const optionCollection = useOptionCollection();
  const { getCount, getOptionAtIndex, getIndexOfId } = optionCollection;

  const { clearSelection, selectedOptions, selectOption } = useSelection(props);

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();

  // track whether keyboard focus outline should be shown
  // tabster/keyborg doesn't work here, since the actual keyboard focus target doesn't move
  const [focusVisible, setFocusVisible] = React.useState(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const maxIndex = getCount() - 1;
    const activeIndex = activeOption ? getIndexOfId(activeOption.id) : -1;
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
      setFocusVisible(true);
    }
  };

  const onMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    setFocusVisible(false);
  };

  // get state from parent combobox, if it exists
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const comboboxActiveOption = useContextSelector(ComboboxContext, ctx => ctx.activeOption);
  const comboboxFocusVisible = useContextSelector(ComboboxContext, ctx => ctx.focusVisible);
  const comboboxSelectedOptions = useContextSelector(ComboboxContext, ctx => ctx.selectedOptions);
  const comboboxSelectOption = useContextSelector(ComboboxContext, ctx => ctx.selectOption);
  const comboboxSetActiveOption = useContextSelector(ComboboxContext, ctx => ctx.setActiveOption);

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = hasComboboxContext
    ? {
        activeOption: comboboxActiveOption,
        focusVisible: comboboxFocusVisible,
        selectedOptions: comboboxSelectedOptions,
        selectOption: comboboxSelectOption,
        setActiveOption: comboboxSetActiveOption,
      }
    : {
        activeOption,
        focusVisible,
        selectedOptions,
        selectOption,
        setActiveOption,
      };

  const state: ListboxState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: multiselect ? 'menu' : 'listbox',
        'aria-activedescendant': hasComboboxContext ? undefined : activeOption?.id,
        tabIndex: 0,
        ...props,
      }),
      { elementType: 'div' },
    ),
    multiselect,
    clearSelection,
    ...optionCollection,
    ...optionContextValues,
  };

  const scrollContainerRef = useScrollOptionsIntoView(state);
  state.root.ref = useMergedRefs(state.root.ref, scrollContainerRef);

  state.root.onKeyDown = useEventCallback(mergeCallbacks(state.root.onKeyDown, onKeyDown));
  state.root.onMouseOver = useEventCallback(mergeCallbacks(state.root.onMouseOver, onMouseOver));

  return state;
};
