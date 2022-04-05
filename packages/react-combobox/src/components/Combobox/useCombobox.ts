import * as React from 'react';
import { resolvePositioningShorthand, usePopper } from '@fluentui/react-positioning';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  useControllableState,
  useFirstMount,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { OptionValue } from '../../utils/OptionCollection.types';
import { useSelection } from '../../utils/useSelection';
import { Listbox } from '../Listbox/Listbox';
import { ComboButton } from '../ComboButton/ComboButton';
import type { ComboboxProps, ComboboxState, ComboboxOpenEvents } from './Combobox.types';

/**
 * Create the state required to render Combobox.
 *
 * The returned state can be modified with hooks such as useComboboxStyles_unstable,
 * before being passed to renderCombobox_unstable.
 *
 * @param props - props from this instance of Combobox
 * @param ref - reference to root HTMLElement of Combobox
 */
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLButtonElement>): ComboboxState => {
  const optionCollection = useOptionCollection(props.children);

  const { inline = false, multiselect, onOpenChange, placeholder, positioning } = props;
  const {
    options,
    collectionData: { count, getOptionAtIndex, getIndexOfKey, getOptionByKey },
  } = optionCollection;
  const idBase = useId('combobox');

  const [activeOption, setActiveOption] = React.useState<OptionValue | undefined>();
  const { selectedOptions, selectOption } = useSelection(props);
  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  // popper
  const popperOptions = {
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

  // update value based on selectedOptions
  const isFirstMount = useFirstMount();
  const value = React.useMemo(() => {
    // don't compute value if it is defined through props,
    if (props.value !== undefined) {
      return props.value;
    }

    if (isFirstMount && props.defaultValue !== undefined) {
      return props.defaultValue;
    }

    if (multiselect) {
      return selectedOptions.map(option => option.value).join(', ');
    }

    return selectedOptions[0]?.value;
  }, [isFirstMount, multiselect, props.defaultValue, props.value, selectedOptions]);

  const setOpen = (event: ComboboxOpenEvents, newState: boolean) => {
    onOpenChange?.(event, { open: newState });
    setOpenState(newState);
  };

  const onOptionClick = (event: React.MouseEvent<HTMLElement>, option: OptionValue) => {
    // clicked option should always become active option
    setActiveOption(getOptionByKey(option.key));

    // close on option click for single-select
    !multiselect && setOpen(event, false);

    // handle selection change
    selectOption(event, option);
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
      case 'Open':
        event.preventDefault();
        setOpen(event, true);
        break;
      case 'Close':
        // stop propagation for escape key to avoid dismissing any parent popups
        event.stopPropagation();
        event.preventDefault();
        setOpen(event, false);
        break;
      case 'CloseSelect':
        !multiselect && setOpen(event, false);
      // fallthrough
      case 'Select':
        activeOption && selectOption(event, activeOption);
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
        'aria-expanded': open,
        'aria-activedescendant': open ? activeOption?.id : undefined,
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
    selectedOptions,
    value,
  };
};
