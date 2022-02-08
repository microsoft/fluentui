import * as React from 'react';
import { getPartitionedNativeProps, resolveShorthand, useControllableState } from '@fluentui/react-utilities';
import { DropdownActions, getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { OptionCollectionState, OptionValue } from '../../utils/OptionCollection.types';
import { useSelection } from '../../utils/useSelection';
import { Listbox } from '../Listbox';
import { ComboButton } from '../ComboButton';
import type { ComboboxProps, ComboboxState } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox = (
  props: ComboboxProps,
  optionCollection: OptionCollectionState,
  ref: React.Ref<HTMLButtonElement>,
): ComboboxState => {
  const { multiselect, open: controlledOpen, placeholder, value: controlledValue } = props;
  const {
    options,
    collectionData: { count, getOptionAtIndex, getIndexOfKey, getOptionByKey },
  } = optionCollection;

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();
  const [selectedKeys, selectKey] = useSelection(props);

  const [value, setValue] = useControllableState({
    state: controlledValue,
    initialState: undefined,
  });

  const [open, setOpen] = useControllableState({
    state: controlledOpen,
    initialState: false,
  });

  // update value based on selectedKeys
  React.useEffect(() => {
    let newValue;
    if (multiselect) {
      newValue = selectedKeys.map(key => getOptionByKey(key).value).join(', ');
    } else {
      const selectedOption = getOptionByKey(selectedKeys[0]);
      newValue = selectedOption ? selectedOption.value : placeholder;
    }

    setValue(newValue);
  }, [getOptionByKey, multiselect, placeholder, selectedKeys, setValue]);

  const onOptionClick = (optionKey: string) => {
    // clicked option should always become active option
    setActiveOption(getOptionByKey(optionKey));

    // close on option click for single-select
    !multiselect && setOpen(false);

    // handle selection change
    selectKey(optionKey);
  };

  const onTriggerClick = () => {
    setOpen(!open);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const action = getDropdownActionFromKey(event, { open, multiselect });
    const maxIndex = count - 1;
    const activeIndex = activeOption ? getIndexOfKey(activeOption.key) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Open:
        event.preventDefault();
        setOpen(true);
        break;
      case DropdownActions.Close:
        // stop propagation for escape key to avoid dismissing any parent popups
        event.stopPropagation();
        event.preventDefault();
        setOpen(false);
        break;
      case DropdownActions.CloseSelect:
        !multiselect && setOpen(false);
      // fallthrough
      case DropdownActions.Select:
        activeOption && selectKey(activeOption.key);
        event.preventDefault();
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

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['children'],
  });

  return {
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
        ref,
        placeholder,
        value,
        onClick: onTriggerClick,
        onKeyDown,
        ...triggerNativeProps,
      },
    }),
    ...optionCollection,
    activeOption,
    onOptionClick,
    open,
    options,
    selectedKeys,
    value,
>>>>>>> combobox with trigger
  };
};
