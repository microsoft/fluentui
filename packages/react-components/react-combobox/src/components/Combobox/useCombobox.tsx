import * as React from 'react';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  resolveShorthand,
  mergeCallbacks,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPopup } from '../../utils/useComboboxPopup';
import { useTriggerListboxSlots } from '../../utils/useTriggerListboxSlots';
import { Listbox } from '../Listbox/Listbox';
import type { Slot } from '@fluentui/react-utilities';
import type { SelectionEvents } from '../../utils/Selection.types';
import type { OptionValue } from '../../utils/OptionCollection.types';
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
export const useCombobox_unstable = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  const baseState = useComboboxBaseState({ ...props, editable: true });
  const {
    activeOption,
    clearSelection,
    getIndexOfId,
    getOptionsMatchingText,
    hasFocus,
    open,
    selectOption,
    selectedOptions,
    setActiveOption,
    setFocusVisible,
    setOpen,
    setValue,
    value,
  } = baseState;
  const { disabled, freeform, inlinePopup, multiselect } = props;
  const comboId = useId('combobox-');

  const { primary: triggerNativeProps, root: rootNativeProps } = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['children', 'size'],
  });

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLInputElement>(null);

  // NVDA and JAWS have bugs that suppress reading the input value text when aria-activedescendant is set
  // To prevent this, we clear the HTML attribute (but save the state) when a user presses left/right arrows
  // ref: https://github.com/microsoft/fluentui/issues/26359#issuecomment-1397759888
  const [hideActiveDescendant, setHideActiveDescendant] = React.useState(false);

  // calculate listbox width style based on trigger width
  const [popupDimensions, setPopupDimensions] = React.useState<{ width: string }>();
  React.useEffect(() => {
    // only recalculate width when opening
    if (open) {
      const width = `${rootRef.current?.clientWidth}px`;
      if (width !== popupDimensions?.width) {
        setPopupDimensions({ width });
      }
    }
  }, [open, popupDimensions]);

  // set active option and selection based on typing
  const getOptionFromInput = (inputValue: string): OptionValue | undefined => {
    const searchString = inputValue?.trim().toLowerCase();

    if (!searchString || searchString.length === 0) {
      return;
    }

    const matcher = (optionText: string) => optionText.toLowerCase().indexOf(searchString) === 0;
    const matches = getOptionsMatchingText(matcher);

    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const startIndex = getIndexOfId(activeOption.id);
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? undefined;
  };

  /* Handle typed input */

  // reset any typed value when an option is selected
  baseState.selectOption = (ev: SelectionEvents, option: OptionValue) => {
    setValue(undefined);
    selectOption(ev, option);
  };

  const onTriggerBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    // handle selection and updating value if freeform is false
    if (!baseState.open && !freeform) {
      // select matching option, if the value fully matches
      if (value && activeOption && value.trim().toLowerCase() === activeOption?.text.toLowerCase()) {
        baseState.selectOption(ev, activeOption);
      }

      // reset typed value when the input loses focus while collapsed, unless freeform is true
      setValue(undefined);
    }
  };

  baseState.setOpen = (ev, newState: boolean) => {
    if (disabled) {
      return;
    }

    if (!newState && !freeform) {
      setValue(undefined);
    }

    setOpen(ev, newState);
  };

  // update value and active option based on input
  const onTriggerChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;
    // update uncontrolled value
    baseState.setValue(inputValue);

    // handle updating active option based on input
    const matchingOption = getOptionFromInput(inputValue);
    setActiveOption(matchingOption);

    setFocusVisible(true);

    // clear selection for single-select if the input value no longer matches the selection
    if (!multiselect && selectedOptions.length === 1 && (inputValue.length < 1 || !matchingOption)) {
      clearSelection(ev);
    }
  };

  // open Combobox when typing
  const onTriggerKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && getDropdownActionFromKey(ev) === 'Type') {
      baseState.setOpen(ev, true);
    }

    // clear activedescendant when moving the text insertion cursor
    if (ev.key === ArrowLeft || ev.key === ArrowRight) {
      setHideActiveDescendant(true);
    } else {
      setHideActiveDescendant(false);
    }
  };

  // resolve input and listbox slot props
  let triggerSlot: Slot<'input'>;
  let listboxSlot: Slot<typeof Listbox> | undefined;

  triggerSlot = resolveShorthand(props.input, {
    required: true,
    defaultProps: {
      ref: useMergedRefs(props.input?.ref, triggerRef),
      type: 'text',
      value: value ?? '',
      ...triggerNativeProps,
    },
  });

  triggerSlot.onChange = mergeCallbacks(triggerSlot.onChange, onTriggerChange);
  triggerSlot.onBlur = mergeCallbacks(triggerSlot.onBlur, onTriggerBlur);
  triggerSlot.onKeyDown = mergeCallbacks(triggerSlot.onKeyDown, onTriggerKeyDown);

  // only resolve listbox slot if needed
  listboxSlot =
    open || hasFocus
      ? resolveShorthand(props.listbox, {
          required: true,
          defaultProps: {
            children: props.children,
            style: popupDimensions,
          },
        })
      : undefined;

  [triggerSlot, listboxSlot] = useComboboxPopup(props, triggerSlot, listboxSlot);
  [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerSlot, listboxSlot);

  if (hideActiveDescendant) {
    triggerSlot['aria-activedescendant'] = undefined;
  }

  const state: ComboboxState = {
    components: {
      root: 'div',
      input: 'input',
      expandIcon: 'span',
      listbox: Listbox,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        'aria-owns': !inlinePopup ? listboxSlot?.id : undefined,
        ...rootNativeProps,
      },
    }),
    input: triggerSlot,
    listbox: listboxSlot,
    expandIcon: resolveShorthand(props.expandIcon, {
      required: true,
      defaultProps: {
        'aria-expanded': open,
        children: <ChevronDownIcon />,
        role: 'button',
      },
    }),
    ...baseState,
  };

  state.root.ref = useMergedRefs(state.root.ref, rootRef);

  /* handle open/close + focus change when clicking expandIcon */
  const { onMouseDown: onIconMouseDown, onClick: onIconClick } = state.expandIcon || {};
  const onExpandIconMouseDown = useEventCallback(
    mergeCallbacks(onIconMouseDown, () => {
      // do not dismiss on blur when closing via clicking the icon
      if (open) {
        baseState.ignoreNextBlur.current = true;
      }
    }),
  );

  const onExpandIconClick = useEventCallback(
    mergeCallbacks(onIconClick, (event: React.MouseEvent<HTMLSpanElement>) => {
      // open and set focus
      state.setOpen(event, !state.open);
      triggerRef.current?.focus();

      // set focus visible=false, since this can only be done with the mouse/pointer
      setFocusVisible(false);
    }),
  );

  if (state.expandIcon) {
    state.expandIcon.onMouseDown = onExpandIconMouseDown;
    state.expandIcon.onClick = onExpandIconClick;

    // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
    // using the following steps:
    // 1. If there is an aria-label, it is "Open [aria-label]"
    // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
    // 3. If there is no aria-label/ledby attr, it falls back to "Open"
    // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
    const hasExpandLabel = state.expandIcon['aria-label'] || state.expandIcon['aria-labelledby'];
    const defaultOpenString = 'Open'; // this is english-only since it is the fallback
    if (!hasExpandLabel) {
      if (props['aria-labelledby']) {
        const chevronId = state.expandIcon.id ?? `${comboId}-chevron`;
        const chevronLabelledBy = `${chevronId} ${state.input['aria-labelledby']}`;

        state.expandIcon['aria-label'] = defaultOpenString;
        state.expandIcon.id = chevronId;
        state.expandIcon['aria-labelledby'] = chevronLabelledBy;
      } else if (props['aria-label']) {
        state.expandIcon['aria-label'] = `${defaultOpenString} ${props['aria-label']}`;
      } else {
        state.expandIcon['aria-label'] = defaultOpenString;
      }
    }
  }

  return state;
};
