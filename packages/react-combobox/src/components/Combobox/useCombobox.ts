import * as React from 'react';
import { Offset, resolvePositioningShorthand, usePopper } from '@fluentui/react-positioning';
import {
  getNativeElementProps,
  useControllableState,
  useFirstMount,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getDropdownActionFromKey, getIndexFromAction } from '../../utils/dropdownKeyActions';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { OptionValue } from '../../utils/OptionCollection.types';
import { useSelection } from '../../utils/useSelection';
import type { ListboxProps } from '../Listbox/Listbox.types';
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
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLDivElement>): ComboboxState => {
  const optionCollection = useOptionCollection(props.children);

  const { inline = false, multiselect, onOpenChange, positioning } = props;
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

  // handle trigger focus/blur
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const ignoreTriggerBlur = React.useRef(false);

  // popper
  const popperOptions = {
    position: 'below' as const,
    align: 'start' as const,
    offset: [0, 2] as Offset,
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

  /*
   * Handle focus when clicking the listbox popup:
   * 1. Move focus back to the button/input when the listbox is clicked (otherwise it goes to body)
   * 2. Do not close the listbox on button/input blur when clicking into the listbox
   */
  const onListboxClick = () => {
    triggerRef.current?.focus();
  };

  const onListboxMouseDown = () => {
    ignoreTriggerBlur.current = true;
  };

  // the trigger should open/close the popup on click or blur
  const onTriggerBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!ignoreTriggerBlur.current) {
      setOpen(event, false);
    }

    ignoreTriggerBlur.current = false;
  };

  const onTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event, !open);
  };

  // handle combobox keyboard interaction
  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
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
      case 'Tab':
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

  /* Pull the Listbox node from the children. To work, it must be the last child. */
  const children = React.Children.toArray(props.children) as React.ReactElement[];
  const lastChild = children.pop();

  if (process.env.NODE_ENV !== 'production') {
    if (children.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('Combobox must have at least two children, and the last child must be the Listbox.');
    }

    if (!lastChild || !React.isValidElement(lastChild) || lastChild.type === React.Fragment) {
      // eslint-disable-next-line no-console
      console.warn('The Listbox must be a valid element and not a fragment.');
    }
  }

  let listbox: React.ReactElement | undefined = undefined;
  if (lastChild && React.isValidElement(lastChild) && lastChild.type !== React.Fragment) {
    const listboxOverrideProps: Partial<ListboxProps> = {
      multiselect,
      tabIndex: undefined,
    };
    listbox = React.cloneElement(lastChild, listboxOverrideProps);
  }

  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
      children,
    }),
    ...optionCollection,
    activeOption,
    idBase,
    inline,
    listbox,
    onListboxClick,
    onListboxMouseDown,
    onOptionClick,
    onTriggerBlur,
    onTriggerClick,
    onTriggerKeyDown,
    open,
    options,
    popperContainerRef,
    selectedOptions,
    triggerRef: useMergedRefs(popperTargetRef, triggerRef),
    value,
  };
};
