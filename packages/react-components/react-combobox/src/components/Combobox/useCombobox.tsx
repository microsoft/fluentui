import * as React from 'react';
import { useFieldControlProps_unstable } from '@fluentui/react-field';
import { ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import { ChevronDownRegular as ChevronDownIcon } from '@fluentui/react-icons';
import {
  getPartitionedNativeProps,
  mergeCallbacks,
  useEventCallback,
  useId,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useComboboxBaseState } from '../../utils/useComboboxBaseState';
import { useComboboxPositioning } from '../../utils/useComboboxPositioning';
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
  // Merge props from surrounding <Field>, if any
  props = useFieldControlProps_unstable(props, { supportsLabelFor: true, supportsRequired: true, supportsSize: true });

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
  const [comboboxPopupRef, comboboxTargetRef] = useComboboxPositioning(props);
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

  // save the typing vs. navigating options state, as the space key should behave differently in each case
  // we do not want to update the combobox when this changes, just save the value between renders
  const isTyping = React.useRef(false);

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

  // resolve input and listbox slot props
  let triggerSlot: Slot<'input'>;
  let listboxSlot: Slot<typeof Listbox> | undefined;

  triggerSlot = slot.always(props.input, {
    defaultProps: {
      ref: useMergedRefs(props.input?.ref, triggerRef),
      type: 'text',
      value: value ?? '',
      ...triggerNativeProps,
    },
    elementType: 'input',
  });
  const resolvedPropsOnKeyDown = triggerSlot.onKeyDown;
  triggerSlot.onChange = mergeCallbacks(triggerSlot.onChange, onTriggerChange);
  triggerSlot.onBlur = mergeCallbacks(triggerSlot.onBlur, onTriggerBlur); // only resolve listbox slot if needed
  listboxSlot =
    open || hasFocus
      ? slot.optional(props.listbox, {
          renderByDefault: true,
          defaultProps: { children: props.children },
          elementType: Listbox,
        })
      : undefined;
  [triggerSlot, listboxSlot] = useTriggerListboxSlots(props, baseState, ref, triggerSlot, listboxSlot);
  const listboxRef = useMergedRefs(listboxSlot?.ref, comboboxPopupRef);

  if (hideActiveDescendant) {
    triggerSlot['aria-activedescendant'] = undefined;
  }

  if (listboxSlot) {
    listboxSlot.ref = listboxRef;
  }

  const rootSlot = slot.always(props.root, {
    defaultProps: {
      'aria-owns': !inlinePopup ? listboxSlot?.id : undefined,
      ...rootNativeProps,
    },
    elementType: 'div',
  });
  rootSlot.ref = useMergedRefs(rootSlot.ref, comboboxTargetRef);

  const state: ComboboxState = {
    components: { root: 'div', input: 'input', expandIcon: 'span', listbox: Listbox },
    root: rootSlot,
    input: triggerSlot,
    listbox: listboxSlot,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        'aria-expanded': open,
        children: <ChevronDownIcon />,
        role: 'button',
      },
      elementType: 'span',
    }),
    ...baseState,
  };

  state.root.ref = useMergedRefs(state.root.ref, rootRef);

  /* Set input.onKeyDown here, so we can override the default behavior for spacebar */
  const defaultOnTriggerKeyDown = state.input.onKeyDown;
  state.input.onKeyDown = useEventCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && getDropdownActionFromKey(ev) === 'Type') {
      baseState.setOpen(ev, true);
    }

    // clear activedescendant when moving the text insertion cursor
    if (ev.key === ArrowLeft || ev.key === ArrowRight) {
      setHideActiveDescendant(true);
    } else {
      setHideActiveDescendant(false);
    }

    // update typing state to true if the user is typing
    const action = getDropdownActionFromKey(ev, { open, multiselect });
    if (action === 'Type') {
      isTyping.current = true;
    }
    // otherwise, update the typing state to false if opening or navigating dropdown options
    // other actions, like closing the dropdown, should not impact typing state.
    else if (
      (action === 'Open' && ev.key !== ' ') ||
      action === 'Next' ||
      action === 'Previous' ||
      action === 'First' ||
      action === 'Last' ||
      action === 'PageUp' ||
      action === 'PageDown'
    ) {
      isTyping.current = false;
    }

    // allow space to insert a character if freeform & the last action was typing, or if the popup is closed
    if (freeform && (isTyping.current || !open) && ev.key === ' ') {
      resolvedPropsOnKeyDown?.(ev);
      return;
    }

    // if we're not allowing space to type, continue with default behavior
    defaultOnTriggerKeyDown?.(ev);
  });

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
