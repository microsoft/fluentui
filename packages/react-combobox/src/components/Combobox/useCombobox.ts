import * as React from 'react';
import { resolvePositioningShorthand, usePopper } from '@fluentui/react-positioning';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { DropdownActions, getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { OptionCollectionState, OptionValue } from '../../utils/OptionCollection.types';
import { useSelection } from '../../utils/useSelection';
import { Listbox } from '../Listbox/Listbox';
import { ComboButton } from '../ComboButton/ComboButton';
import type { ComboboxProps, ComboboxState, OpenEvents } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (
  props: ComboboxProps,
  optionCollection: OptionCollectionState,
  ref: React.Ref<HTMLButtonElement>,
): ComboboxState => {
  const {
    inline = false,
    multiselect,
    onOpenChange,
    open: controlledOpen,
    placeholder,
    positioning,
    value: controlledValue,
  } = props;
  const {
    options,
    collectionData: { count, getOptionAtIndex, getIndexOfKey, getOptionByKey },
  } = optionCollection;
  const idBase = useId('combobox');

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();
  const [selectedKeys, selectKey] = useSelection(props);

  const [value, setValue] = useControllableState({
    state: controlledValue,
    initialState: undefined,
  });

  const [open, setOpenState] = useControllableState({
    state: controlledOpen,
    initialState: false,
  });

  // popper
  const popperOptions = {
    enabled: open,
    position: 'below' as const,
    align: 'start' as const,
    ...resolvePositioningShorthand(positioning),
  };

  const {
    targetRef: popperTargetRef,
    containerRef: popperContainerRef,
  }: {
    targetRef: React.MutableRefObject<HTMLButtonElement>;
    containerRef: React.MutableRefObject<HTMLDivElement>;
  } = usePopper(popperOptions);

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

  const setOpen = (event: OpenEvents, newState: boolean) => {
    onOpenChange?.(event, { open: newState });
    setOpenState(newState);
  };

  const onOptionClick = (event: React.MouseEvent<HTMLElement>, optionKey: string) => {
    // clicked option should always become active option
    setActiveOption(getOptionByKey(optionKey));

    // close on option click for single-select
    !multiselect && setOpen(event, false);

    // handle selection change
    selectKey(event, optionKey);
  };

  const onTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event, !open);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const action = getDropdownActionFromKey(event, { open, multiselect });
    const maxIndex = count - 1;
    const activeIndex = activeOption ? getIndexOfKey(activeOption.key) : -1;
    let newIndex = activeIndex;

    switch (action) {
      case DropdownActions.Open:
        event.preventDefault();
        setOpen(event, true);
        break;
      case DropdownActions.Close:
        // stop propagation for escape key to avoid dismissing any parent popups
        event.stopPropagation();
        event.preventDefault();
        setOpen(event, false);
        break;
      case DropdownActions.CloseSelect:
        !multiselect && setOpen(event, false);
      // fallthrough
      case DropdownActions.Select:
        activeOption && selectKey(event, activeOption.key);
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
    listbox: resolveShorthand(props.listbox, {
      required: true,
      defaultProps: {
        ref: popperContainerRef,
        tabIndex: undefined,
      },
    }),
    trigger: resolveShorthand(props.trigger, {
      required: true,
      defaultProps: {
        ref: useMergedRefs(ref, popperTargetRef),
        placeholder,
        value,
        onClick: onTriggerClick,
        onKeyDown,
        ...triggerNativeProps,
      },
    }),
    ...optionCollection,
    activeOption,
    idBase,
    inline,
    onOptionClick,
    open,
    options,
    selectedKeys,
    value,
  };
};
